import React from 'react'
import s from './CardContract.module.css'
import { Link } from 'react-router-dom'

function CardContract() {
  return (
    <div className={s.card}>
        <ul>
            <li><span><h4>Descripcion del trabajo</h4>Necesito que me hagan bien el reboque porque vino una persona y la termino
                mal entonces me gustaria que me la hagan bien, tambien me gustaria que me instalen la antena de wifi y el aire
                acondicionado.</span>  
            </li>
            <li><span><h4>Fecha</h4>Viernes 20/10/2022 15:00 hs.</span></li>
            <li><span><h4>Lugar</h4>9 de julio y doxear.</span></li>
            <li><span><h4>Estado</h4>No confirmado</span></li>
            <li><h4><Link to = "#">Marcar como terminado</Link></h4></li>
        </ul>
    </div>
  )
}

export default CardContract