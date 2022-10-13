import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserId,
  getUsers,
  getUserDetail,
  getWorkers,
} from "../../redux/actions/actions";
import WorkerCard from "../WorkerCard/WorkerCard";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

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

  // const [favShow, setFavShow ] = useState([])

  // for (let i = 0; i < favouritesId.length; i++) {
  //     let element = favouritesId[i];
  //     //console.log(element)
  //     // ver si el filter me devuelve el worker o que me devuelve, necesito el worker entero para poder renderizar la card
  //     let workfav = allWorker.filter(e => e.ID === element)
  //     //console.log(workfav)
  //     if(workfav){
  //         // aca es para modificar un estado que es array para ir metiendolos (ver google)
  //         //sino hacer una variable y pushear en todas las vueltas del for y despues setear ese array como estado (mirar que es buena practica)
  //         //setFavShow((...prevState) => ...prevState, workfav)
  //         setFavShow(workfav)

  //     }
  // }
  // console.log(favShow)
  return (
    <div>
      {/* hay que checkear que haya fav, me parece que el all worker esta porque antes no esperaba sino para renderizar, VER */}
      {allWorker.length &&
        // asd aca tengo que mapear Usuarios Worker completos, con jobs contract
        workersFavs.map((worker) => (
          <>
            {console.log(worker)}

            <div>
              <WorkerCard
                Worker={worker[0]}
                User={worker[0].User}
                Jobs={worker[0].Jobs}
                Contracts={worker[0].Contracts}
              />
              <IconButton aria-label="delete">
                <DeleteIcon />
              </IconButton>
            </div>
          </>
        ))}
    </div>
  );
}
