import React from 'react'
import s from './CardContract.module.css'
import { Link } from 'react-router-dom'
import { modifyContract } from '../../redux/actions/actions'
import { connect } from 'react-redux'

function CardContract({date,location,state,description,worker,type,id,force}) {

  const confirmar = () => {
    console.log(id)
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
                     type == 'c' ? <li><h4><button onClick={terminar}>Marcar como terminado</button></h4></li> : 
                     type == 't' ? <li><h4><button onClick={opinar}>Dejar opinion(deberia saltar un formulario modal)</button></h4></li> : <></>
            : <></> }
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
