import * as React from 'react';
import './Profile.css'
import Perfil from '../../img/perfil.jpg';
import Buttons from './Buttons';
import Status from './Status';
import { useState } from 'react';
import { AlertTitle, Dialog } from '@mui/material';
import ContractForm from '../ContractForm/ContractForm';
import { useAuth0 } from "@auth0/auth0-react";
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Profile({id,ocultarFilters,img,name,jobs,description,available,status}) {
  // const name = "Barroso Carlos Gonzalo"
  // let jobs = ["Electricista","Gasista","Plomero","Programador"]
  // const description = "La verdad me considero un capo de capos de masters de to, no ve la sonrisa de capo que tengo, ademas, te sigo por toda la pagina jeje"
  // const available = "Mi disponibilidad es cuando te pinte a vos papa, vos me avisa y yo estoy ahi, pero sino solo los lunes a las 14"
  // const status = "Online✅"
  const login = useAuth0()
  let sub = false
  if(login.isAuthenticated) sub = login.user.sub;

  const [open, setOpen] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpen = () => {
    if(!login.isAuthenticated) {
      return setOpenLogin(true)// pendiente pop up para avisar que debe logearse
    }

    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const handleClosePopUp = () => {
    setOpenLogin(false)
  }

  return (
    <div className="profile-card">
      <div className="card-img">
          <img src={img? img : Perfil} alt="perfil" />
      </div>

      <div className="card-info">
        
        <p className="text-title">{name}</p>
        <div className='profile-information'>
          <div className='jobs-container'>
            {jobs ? jobs.map( (job) => (
              <Chip key={job} className='chip-job' color="primary" label={job}/>
            )) :  <Chip  className='chip-job' label="Usuario" />}
          </div>
          <label className='label-description' htmlFor="description">Descripción</label>
          <p className="text-info">{description? description : "No se ha realizado una descripcion aun."}</p>
          <label className='label-description' htmlFor="disponibility">Disponible</label>
          {jobs && jobs.length ? <p className="text-info">{available? available : "Disponibilidad no registrada aun"}</p> : "" }
          <label className='label-description' htmlFor="disponibility">Estado</label>
          <div className="text-info">{status ? <Status text="Conectado"/> : <Status text="Desconectado"/>}</div>
        </div>   
        <div className="contactar">
          <Button className="buttonStyled" variant="contained" size="large">Mensaje</Button>
          {jobs && jobs.length && <Button className="buttonStyled"  onClick={handleOpen} variant="contained" size="large">Contratar</Button>}
          
          <Modal
            open={open}
            onClose={handleClose}
          >
            <>
              <ContractForm id={sub} worker_id={id} closeCB={handleClose} />
            </>
          </Modal>
        </div>
        <Snackbar open={openLogin} autoHideDuration={3000} onClose={handleClosePopUp}>
        <Alert onClose={handleClosePopUp} severity="warning" sx={{ width: '100%' }}>
          Debe ingresar a la plataforma para poder contratar
        </Alert>
      </Snackbar>
      </div>
    </div>
  )
}

export default Profile