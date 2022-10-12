import React from 'react'
import s from './CardContract.module.css'
import { Link } from 'react-router-dom'
import { modifyContract } from '../../redux/actions/actions'
import { connect } from 'react-redux'
import { Modal ,Button} from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import FormOpinion from '../FormOpinion/FormOpinion'


function CardContract({cu,cw,date,location,state,description,worker,type,id,force}) {

  const [open, setOpen] = React.useState(false);
  const [controlable, setControlable] = React.useState(false);
  const login = useAuth0()
  let sub = false

  //Esto es para que el boton solo permite dejar una opinion si no hay opinion
  React.useEffect(()=>{
    if(worker && cw) 
      setControlable(true)
    if(!worker && cu)
      setControlable(true)
    },[controlable])

  if(login.isAuthenticated) sub = login.user.sub;

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => setOpen(false);

  const confirmar = () => {
    modifyContract({confirmed:true},id)
    force()
  }
  const terminar = () => {
    modifyContract({finished:true},id)
    force()
  }
  const opinar = () => {
    modifyContract({confirmed:true},id)
    force()
  }
  const cancelar = () => {
    modifyContract({finished:true},id)
    force()
  }
  return (
    <div className={s.card}>
        <ul>
            <li><span><h4>Fecha</h4>{date? date : "No especificado"}.</span></li>
            <li><span><h4>Lugar</h4>{location? location : "No especificado"}.</span></li>
            <li><span><h4>Estado</h4>{state}</span></li>
            <li><span><h4>Descripcion del trabajo</h4>{description? description : "No especificado"}.</span>  
            </li>
            
            {worker? type == 'p' ? <li><h4><button onClick={confirmar} >Confirmar</button><p></p><button onClick={cancelar}>Cancelar</button></h4></li> :
                     type == 'c' ? <li><h4><button onClick={terminar}>Marcar como terminado</button></h4></li> : <></>
            : <></> }
            {type == 't' ? <li><h4><Button disabled = {controlable} onClick={handleOpen}>Dejar opinion(deberia saltar un formulario modal)</Button></h4></li> : <></>}
            <Modal
            open={open}
            onClose={handleClose}
          >
            <>
              <FormOpinion id={id} worker={worker} closeCB={handleClose} />
            </>
          </Modal>
        </ul>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

function mapDispatchToProps (dispatch) {
  return {

   
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CardContract)
