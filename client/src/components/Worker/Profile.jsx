import React, { useEffect } from 'react'
import './Profile.css'
import Perfil from '../../img/perfil.jpg';
import Buttons from './Buttons';
import Status from './Status';
import { useState } from 'react';
import { Alert, AlertTitle, Dialog, Modal } from '@mui/material';
import ContractForm from '../ContractForm/ContractForm';
import { useAuth0 } from "@auth0/auth0-react";

function Profile({id,ocultarFilters,img,name,jobs,description,available,status}) {
  // const name = "Barroso Carlos Gonzalo"
  // let jobs = ["Electricista","Gasista","Plomero","Programador"]
  // const description = "La verdad me considero un capo de capos de masters de to, no ve la sonrisa de capo que tengo, ademas, te sigo por toda la pagina jeje"
  // const available = "Mi disponibilidad es cuando te pinte a vos papa, vos me avisa y yo estoy ahi, pero sino solo los lunes a las 14"
  // const status = "Online✅"
  const login = useAuth0()
  let sub = false
  if(login.isAuthenticated)
      sub = login.user.sub

  console.log(id)


  const [modal, setModal] = useState(false);
  const [alerta,setAlerta] = useState(false)

  const toggleModal = () => {
    if(!sub)
      setAlerta(true)
    else
      setModal(!modal);
  };
  if(modal) {
    console.log("hola")
    ocultarFilters(true)
    document.body.classList.add('active-modal')
  } else {
    ocultarFilters(false)
    document.body.classList.remove('active-modal')
  }
  
  if(jobs)
    jobs = jobs.reduce((acum,e) => acum + " " + e ) 
  
  return (
    <div className="profile-card">
      <div className="card-img">
          <img src={img? img : Perfil} alt="perfil" />
      </div>

      <div className="card-info">
        
        <p className="text-title">{name}</p>
            {jobs && jobs.length ? <p className="job-title">{jobs}</p>: <p className="text-body">Usuario</p> }
    
        <p className="text-body">{description? description : "No se ha realizado una descripcion aun."}</p>
        {jobs && jobs.length ? <p className="text-body">{available? available : "Disponibilidad no registrada"}</p> : "" }
        <div className="text-body">{status ? <Status text="Online"/> : <Status text="Offline"/>}</div>
        <div className="contactar">
          <button className='worker-button'><span>Mensaje</span></button>
          {jobs && jobs.length ? <>
          <button onClick={toggleModal}  className='worker-button'><span>Contratar</span></button> 
          {modal && (
          <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <ContractForm id={sub} worker_id={id} onClick={toggleModal}/>
          </div>
          </div>)}
          </>: "" }
          
          
        </div>
      </div>{alerta? <Alert style={{marginTop:"2vw",position:'absolute',top:'80%'}} severity='info'>
                <AlertTitle>Info</AlertTitle>
                Debe estar logueado para poder pedir un trabajo.
          </Alert> : <></>}
    </div>
  )
}

export default Profile