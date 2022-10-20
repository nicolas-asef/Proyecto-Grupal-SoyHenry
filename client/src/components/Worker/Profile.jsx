import * as React from "react";
import "./Profile.css";
import Perfil from "../../img/perfil.jpg";
import Buttons from "./Buttons";
import Status from "./Status";
import { useState, useEffect } from "react";
import { AlertTitle, Dialog } from "@mui/material";
import ContractForm from "../ContractForm/ContractForm";
import { useAuth0 } from "@auth0/auth0-react";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useParams } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  deletedFavorite,
  getChatByUsers,
} from "../../redux/actions/actions";
import { Followers } from "../Followers/Followers";
import { useNavigate, Link } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile({
  id,
  ocultarFilters,
  img,
  name,
  jobs,
  description,
  available,
}) {
  // const name = "Barroso Carlos Gonzalo"
  // let jobs = ["Electricista","Gasista","Plomero","Programador"]
  // const description = "La verdad me considero un capo de capos de masters de to, no ve la sonrisa de capo que tengo, ademas, te sigo por toda la pagina jeje"
  // const available = "Mi disponibilidad es cuando te pinte a vos papa, vos me avisa y yo estoy ahi, pero sino solo los lunes a las 14"
  // const status = "Online✅"
  const login = useAuth0();
  const params = useParams();
  let sub = false;
  if (login.isAuthenticated) sub = login.user.sub;

  const status = useSelector((state) => state.userDetail.isOnline);
  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const socket = useSelector((state) => state.socket);
  const navigate = useNavigate();
  const handleOpen = () => {
    if (!login.isAuthenticated) {
      return setOpenLogin(true); // pendiente pop up para avisar que debe logearse
    }

    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleClosePopUp = () => {
    setOpenLogin(false);
  };
  const chat = useSelector((state) => state.chat);
  const userD = useSelector((state) => state.userDetail.Favorites);
  const dispatch = useDispatch();
  const us = useSelector((state) => state.users);
  const userID = useSelector((state) => state.users);

  const idWorkerFav = useSelector((state) => state.userDetail);
  const usW = us.Favorites;
  const [checked, setChecked] = React.useState(false);
  const worksFavs = idWorkerFav.Favorites;
  let follow;
  if (idWorkerFav.Worker) {
    follow = usW && usW.find((e) => e.Fav.WorkerID === idWorkerFav.Worker.ID);
  }

  useEffect(() => {
    if (follow) {
      setChecked(true);
    }
  }, []);
  /* useEffect(()=>{
  if (!login.isAuthenticated) {
    return setOpenLogin(true); // pendiente pop up para avisar que debe logearse
  }
  dispatch(getChatByUsers(params.id, login.user.sub))
},[]) */
  const handleFav = (e) => {
    if (idWorkerFav.Worker) {
      if (!checked) {
        setChecked(true);
        dispatch(addFavorite(userID.id, idWorkerFav.Worker.ID));
      } else {
        setChecked(false);
        dispatch(deletedFavorite(userID.id, idWorkerFav.Worker.ID));
      }
    }
  };
  const handleChat = () => {
    socket?.emit("messageCreation", {
      id_emisor: login.user.sub,
      id_receptor: params.id,
      texto: "",
      redirect: true,
    });
    navigate(`/chat/${chat.id}`);
  };

  return (
    <div className="profile-card">
      <div className="card-img">
        <img src={img ? img : Perfil} alt="perfil" />
      </div>

      <div className="card-info">
        <p className="text-title">{name}</p>
        <div className="profile-information">
          <div className="jobs-container">
            {jobs ? (
              jobs.map((job) => (
                <Chip key={job} className="chip-job" label={job} />
              ))
            ) : (
              <Chip className="chip-job" label="Usuario" />
            )}
          </div>
          {jobs && jobs.length && (
            <>
              <label className="label-description" htmlFor="description">
                Descripción
              </label>
              <p className="text-info">
                {description
                  ? description
                  : "No se ha realizado una descripcion aun."}
              </p>
            </>
          )}

          <div>
            <span className="followers">
              Seguidores:
              <Followers id={id} />
            </span>

            {img !== userID.img ? (
              <div className="follows">
                <span>Seguir:</span>
                <Checkbox
                  checked={checked}
                  icon={<FavoriteBorder />}
                  id={id}
                  checkedIcon={<Favorite />}
                  onClick={handleFav}
                />
              </div>
            ) : (
              ""
            )}
          </div>
          {jobs && jobs.length ? (
            <label className="label-description" htmlFor="disponibility">
              Disponible
            </label>
          ) : (
            ""
          )}
          {jobs && jobs.length ? (
            <p className="text-info">
              {available ? available : "Disponibilidad no registrada aun"}
            </p>
          ) : (
            ""
          )}
          <label className="label-description" htmlFor="disponibility">
            Estado
          </label>
          <div className="text-info">
            {status ? (
              <Status text="Conectado" />
            ) : (
              <Status text="Desconectado" />
            )}
          </div>
        </div>
        <div className="contactar">
          <Button
            className="buttonStyled"
            variant="contained"
            size="large"
            disabled={params.id === sub ? true : false}
            onClick={handleChat}
          >
            Mensaje
          </Button>
          {jobs && jobs.length && (
            <Button
              className="buttonStyled"
              disabled={params.id === sub ? true : false}
              onClick={handleOpen}
              variant="contained"
              size="large"
            >
              Contratar
            </Button>
          )}

          <Modal open={open} onClose={handleClose}>
            <>
              <ContractForm
                id={params.id}
                worker_id={id}
                closeCB={handleClose}
              />
            </>
          </Modal>
        </div>
        <Snackbar
          open={openLogin}
          autoHideDuration={3000}
          onClose={handleClosePopUp}
        >
          <Alert
            onClose={handleClosePopUp}
            severity="warning"
            style={{ height: "10vh", display: "flex", alignItems: "center" }}
            sx={{ width: "100%" }}
          >
            Debe ingresar a la plataforma para poder contratar
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}

export default Profile;
