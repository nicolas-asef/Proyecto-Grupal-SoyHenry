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

  const favId = [];
  favourites && favourites.map((e) => favId.push(e.ID));
  const allWorker = useSelector((state) => state.allWorkers);
  const workersFavs = [];
  for (let i = 0; i < favId.length; i++) {
    const element = allWorker.filter((e) => e.ID === favId[i]);
    workersFavs.push(element);
  }
  useEffect(() => {
    dispatch(getWorkers());
    dispatch(getUserId(id));
    //dispatch(getUserDetail(id));
  }, [dispatch]);

  // useEffect(() => {
  // }, [workersFavs]);
  // const uId = useSelector((state) => state.userDetail.id);
  const onClick = (e) => {
    const deleteFav = workersFavs.filter((w) => w[0].ID === e.target.id);
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
          <h3 className={s.titulo}>Trabajadores Favoritos</h3>
          {allWorker.length && workersFavs
            ? workersFavs.map((worker, index) => (
                <>
                  <div className={s.hijo}>
                    <WorkerCard
                      Worker={worker[0]}
                      User={worker[0].User}
                      Jobs={worker[0].Jobs}
                      Contracts={worker[0].Contracts}
                      callback={onClick}
                      workerId={worker[0].ID}
                    />
                    {/* <IconButton
                  aria-label="delete"
                  onClick={onClick}
                  id={worker[0].ID}
                >
                   este es el id que no estoy pudiendo captar en el onClick */}
                    {/* <DeleteIcon name={index} />
                </IconButton> */}
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
