import React from 'react'
import PopUp from '../PopUp/PopUp';
import style from './PopUps.module.css'
import { useAuth0 } from "@auth0/auth0-react";

function PopUps({popUps}) {

  const {
    user: { sub },
  } = useAuth0();
    

  const descripciones = {
    contrato:"te ha enviado un contrato",
    confirmado: "ha confirmado tu trabajo",
    terminado: "ha marcado como terminado el trabajo",
    opinado: "te ha puntuado",
    cancelado: "ha cancelado tu contrato",
    mensaje: "te ha enviado un mensaje privado"
  }
  const ruta = {
    contrato: "contracts/user/"+sub,
    confirmado: "contracts/user/"+sub,
    terminado: "contracts/user/"+sub,
    opinado: "profile/user/"+sub,
    cancelado: "contracts/user/"+sub,
    mensaje: "mensaje"
  }
  return (
    
    <div className={style.popUps}>
      <div className={style.titulo}>
        <h3>Notificaciones</h3>
       
      </div>
      <hr style={{border: "2px solid rgb(209, 209, 209)", borderRadius: "5px"}}/>
      {popUps.map(e => 
        <PopUp
         img = {e.img}
         name = {e.name}
         description = {descripciones[e.type]}
         ruta = {ruta[e.type]}
         id_mensaje = {e.id_mensaje}
         />
      )}
      {/* <PopUp img="https://img.wattpad.com/97bb76ad9590aeac61e7d91ae1f7dacdc5e8adb7/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f454f4574326c7a704437437a65413d3d2d3136342e313630306663396331356333376333333934363634353939313638322e6a7067?s=fit&w=720&h=720"
      name="Gonzalo"
      description="Te ha enviado un contrato"
    />
    <PopUp img="https://img.wattpad.com/97bb76ad9590aeac61e7d91ae1f7dacdc5e8adb7/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f454f4574326c7a704437437a65413d3d2d3136342e313630306663396331356333376333333934363634353939313638322e6a7067?s=fit&w=720&h=720"
      name="Gonzalo"
      description="Te ha enviado un contrato"
    /> */}
    </div>
  )
}

export default PopUps