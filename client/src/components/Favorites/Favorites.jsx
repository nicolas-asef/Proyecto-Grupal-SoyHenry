import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserId,
  getUsers,
  getUserDetail,
  getWorkers,
  deletedFavorite,
} from "../../redux/actions/actions";
import WorkerCard from "../WorkerCard/WorkerCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import s from "./Favorites.module.css";
import { useNavigate } from "react-router-dom";

export default function Favourite() {
  const dispatch = useDispatch();

  const {
    user: { sub },
  } = useAuth0();

  const id = sub;
  const favourites = useSelector((state) => state.users.Favorites);
  console.log(favourites);
  const favId = [];
  favourites && favourites.map((e) => favId.push(e.ID));
  console.log(favId);
  const allWorker = useSelector((state) => state.allWorkers);
  console.log(allWorker);
  const workersFavs = [];
  for (let i = 0; i < favId.length; i++) {
    const element = allWorker.filter((e) => e.ID === favId[i]);
    workersFavs.push(element);
  }
  console.log(workersFavs);
  useEffect(() => {
    dispatch(getWorkers());
    dispatch(getUserId(id));
    //dispatch(getUserDetail(id));
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("a");
  // }, [workersFavs]);
  // const uId = useSelector((state) => state.userDetail.id);
  // console.log(uId);
  const onClick = (e) => {
    console.log(workersFavs);
    console.log(e.target.id);
    const deleteFav = workersFavs.filter((w) => w[0].ID === e.target.id);
    console.log(deleteFav);
    dispatch(deletedFavorite(id, deleteFav[0][0].ID));
    // navigate("/home");
    // handleClose();
  };
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div className={s.super}>
      {open ? (
        <div className={s.conteiner}>
          <h3 className={s.titulo}>My Favourites Workers</h3>
          {allWorker.length && workersFavs
            ? workersFavs.map((worker, index) => (
                <>
                  {console.log(worker)}
                  <div className={s.hijo}>
                    <WorkerCard
                      Worker={worker[0]}
                      User={worker[0].User}
                      Jobs={worker[0].Jobs}
                      Contracts={worker[0].Contracts}
                    />
                    {/* <IconButton
                  aria-label="delete"
                  onClick={onClick}
                  id={worker[0].ID}
                >
                   este es el id que no estoy pudiendo captar en el onClick */}
                    {/* <DeleteIcon name={index} />
                </IconButton> */}
                    <div className={s.buton}>
                      <button
                        onClick={onClick}
                        id={worker[0].ID}
                        className={s.boton}
                      >
                        X
                      </button>
                    </div>
                  </div>
                </>
              ))
            : ""}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
