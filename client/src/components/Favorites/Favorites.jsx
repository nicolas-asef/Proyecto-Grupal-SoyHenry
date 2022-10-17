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

export default function Favourite() {
  const dispatch = useDispatch();

  const {
    user: { sub },
  } = useAuth0();

  const id = sub;
  const favourites = useSelector((state) => state.userDetail.Favorites);
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
    dispatch(getUserDetail(id));
  }, [dispatch]);

  const uId = useSelector((state) => state.userDetail.id);
  console.log(uId);
  const onClick = (e) => {
    console.log(e.target.id);
    const deleteFav = workersFavs.filter((w) => w.ID !== e.target.id);
    console.log(deleteFav[0][0]);
    // aca en deleteFav le tengo que mandar o el worker a eliminar o el id del worker (sequelize lo identifica si le mandas el worker entero o el id)
    // falta captarlo en el filter
    dispatch(deletedFavorite(uId, deleteFav[0][0].ID));
  };
  const [open, setOpen] = useState(true);
  // useEffect(() => {
  //   return () => {
  //     handleClose();
  //   };
  // });
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* <Modal open={open} onClose={handleClose}>
        <Box> */}
      <div>
        {/* hay que checkear que haya fav, me parece que el all worker esta porque antes no esperaba sino para renderizar, VER */}
        <h3>My Favourites Workers</h3>
        {allWorker.length &&
          // asd aca tengo que mapear Usuarios Worker completos, con jobs contract
          workersFavs.map((worker, index) => (
            <>
              {/* {(idd = worker[0].ID)} */}
              {console.log(worker)}
              <div>
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
                <button onClick={onClick} id={worker[0].ID}>
                  eliminar
                </button>
              </div>
            </>
          ))}
      </div>
      {/* </Box>
      </Modal> */}
    </div>
  );
}
