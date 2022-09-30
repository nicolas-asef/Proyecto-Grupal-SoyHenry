import React from 'react'
import { Link } from 'react-router-dom'
import s from './WorkerCard.module.css'

const WorkerCard = ({ Worker, User, Jobs, Contracts }) => {


    let totalrating = 0
    Contracts.map(contract => (totalrating = totalrating + contract.rating_W))

    let finishedContracts = Contracts.filter(contract => contract.finished === true)

    return (<div>
        <Link to={`/worker/${Worker.ID}`}>
            <div className={s.CardDiv}>
                <div className={s.imgDiv}>
                    <img src={User.img} alt='img'></img>
                </div>
                <div className={s.atributos}>
                    <h2>{`${User.name} ${User.lastName}`}</h2>
                    <h3>Ubicación: {User.location}</h3>
                    <h3>Estado: {User.status === false ? 'Desconectado' : 'Conectado'}</h3>

                    {Jobs.length === 1 ? <h3>{`Profesion: ${Jobs.map(job => `${job.name}`)}`}</h3> : <h3>{`Profesiones: ${Jobs.map(job => ` ${job.name}`)}`}</h3>}

                    <h3>Rating: {totalrating / Contracts.length}</h3>
                    <h3>Trabajos hechos: {finishedContracts.length}</h3>
                </div>
            </div>
        </Link>
    </div>)
}

export default WorkerCard