import React from 'react'
import './Profile.css'
import Perfil from '../../img/perfil.jpg';
import Buttons from './Buttons';
// {name,jobs,description,available,status}
function Profile({name,jobs,description,available,status}) {
  // const name = "Barroso Carlos Gonzalo"
  // let jobs = ["Electricista","Gasista","Plomero","Programador"]
  // const description = "La verdad me considero un capo de capos de masters de to, no ve la sonrisa de capo que tengo, ademas, te sigo por toda la pagina jeje"
  // const available = "Mi disponibilidad es cuando te pinte a vos papa, vos me avisa y yo estoy ahi, pero sino solo los lunes a las 14"
  // const status = "Online✅"
  if(jobs)
    jobs = jobs.reduce((acum,e) => acum + " " + e ) 
  return (
    <div className="card">
        <div className="card-img">
            <img src={Perfil} alt="perfil" />
        </div>
        <div className="card-info">
        {/* <p></p>
        <button className='worker-button'><span>Contratar</span></button>
        <p></p>
        <button className='worker-button'><span>Iniciar Chat</span></button>
        <p></p> */}
        {/* <div className="iniciar-chat">
          <button className='worker-button'><span>Iniciar chat</span></button>
          <button className='worker-button'><span>Contratar</span></button>
        </div> */}
       
        <p className="text-title">{name}</p>
            {jobs ? <p className="text-body">{jobs}</p>: <p className="text-body">Error no se han mandado Jobs</p> }
            {/* <p className="text-body">Electricista Gasista Plomero Programador </p> */}
        <p className="text-body">{description}</p>
        <p className="text-body">{available}</p>
        <p className="text-body">Status:{status}</p>
        <div className="contactar">
          <button className='worker-button'><span>Mensaje</span></button>
          <button className='worker-button'><span>Contratar</span></button>
        </div>
        {/* Online✅-Offline⛔ */}
        </div>
    </div>
  )
}

export default Profile