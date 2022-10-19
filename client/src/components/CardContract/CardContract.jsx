import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { modifyContract } from "../../redux/actions/actions";
import FormOpinion from "../FormOpinion/FormOpinion";
import { GET_WORKER_DETAIL } from "../../redux/actions/actions_vars";

import { Modal, Button } from "@mui/material";
import s from "./CardContract.module.css";

function CardContract({
  userID,
  cu,
  cw,
  date,
  location,
  state,
  description,
  worker,
  type,
  id,
  force,
  loading,
}) {
  const [open, setOpen] = React.useState(false);
  const [controlable, setControlable] = React.useState(false);
  const login = useAuth0();
  let sub = false;
  const socket = useSelector((state) => state.socket);

  //Esto es para que el boton solo permite dejar una opinion si no hay opinion
  React.useEffect(() => {
    if (worker && cw) setControlable(true);
    if (!worker && cu) setControlable(true);
  }, [controlable]);

  if (login.isAuthenticated) sub = login.user.sub;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const confirmar = () => {
    modifyContract({ confirmed: true }, id);
    socket?.emit("enviarNotificacion", {
      receptor_id: userID,
      emisor_id: sub,
      tipo: "confirmado",
    });
    force();
    loading();
  };
  const terminar = () => {
    modifyContract({ finished: true }, id);
    socket?.emit("enviarNotificacion", {
      receptor_id: userID,
      emisor_id: sub,
      tipo: "terminado",
    });
    force();
    loading();
  };
  const opinar = () => {
    socket?.emit("enviarNotificacion", {
      receptor_id: userID,
      emisor_id: sub,
      tipo: "opinado",
    });
  };
  const cancelar = () => {
    modifyContract({ finished: true }, id);
    socket?.emit("enviarNotificacion", {
      receptor_id: userID,
      emisor_id: sub,
      tipo: "cancelado",
    });
    force();
  };
  return (
    <div className={s.card}>
      <div className={s.dataContainer}>
        <h3>Contrato de trabajo</h3>

        <div className={s.containerInfo}>
          <h4>Fecha : </h4>
          <span>{date ? date : "No especificado"}.</span>
        </div>
        <div className={s.containerInfo}>
          <h4>Lugar : </h4>
          <span>{location ? location : "No especificado"}.</span>
        </div>
        <div className={s.containerInfo}>
          <h4>Estado : </h4>
          <span>{state}</span>
        </div>
        <div className={s.containerInfoDesc}>
          <h4>Descripcion del trabajo</h4>
          <span>{description ? description : "No especificado"}.</span>
        </div>
      </div>
      {worker ? (
        type == "p" ? (
          <div className={s.btnsConfirmacion}>
            <button onClick={confirmar}>Confirmar</button>
            <button onClick={cancelar}>Cancelar</button>
          </div>
        ) : type == "c" ? (
          <div className={s.btnsConfirmacion}>
            <button onClick={terminar}>Marcar como terminado</button>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {type == "t" ? (
        <li>
          <h4 className={s.opinion}>
            <Button disabled={controlable} onClick={handleOpen}>
              Dejar opinion !!
            </Button>
          </h4>
        </li>
      ) : (
        <></>
      )}
      <Modal open={open} onClose={handleClose}>
        <>
          <FormOpinion
            handler={opinar}
            id={id}
            worker={worker}
            closeCB={handleClose}
          />
        </>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => ({});

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(CardContract);
