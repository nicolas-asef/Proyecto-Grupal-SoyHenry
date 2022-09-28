import React from 'react'
import { Link } from 'react-router-dom'

const WorkerCard = ({ User, Jobs, id}) => {
    return (
    <div className="CountryCard">
    <img src={User.img} alt='img'></img>
    <h2>{User.name}</h2>
    <h3>{User.lastName}</h3>      
    <h3>{User.location}</h3>
    <h3>{User.status}</h3>
    <h3>{Jobs.name}</h3> 

    </div>)
}

export default WorkerCard