import React from 'react'
import './Profile.css'
import Perfil from '../../img/perfil.jpg';

function Profile() {
  return (
    <div className="card">
        <div className="card-img">
            <img src={Perfil} alt="perfil" />
        </div>
        <div className="card-info">
        <p className="text-title">Gonzalo Carlos Barroso</p>
            <p className="text-body">Electricista Gasista Plomero Programador </p>
        <p className="text-body">La verdad me considero un capo de capos de masters de to, no ve 
        la sonrisa de capo que tengo, ademas, te sigo por toda la pagina jeje</p>
        <p className="text-body">Mi disponibilidad es cuando te pinte a vos papa, vos me avisa
        y yo estoy ahi, pero sino solo los lunes a las 14</p>
        <p className="text-body">Status:Online✅-Offline⛔</p>
        </div>
    </div>
  )
}

export default Profile