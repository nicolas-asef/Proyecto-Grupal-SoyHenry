import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getWorkers } from '../../redux/actions/actions'
import WorkerCard from '../WorkerCard/WorkerCard';
import { workersdb } from './workersdb' // Database de trabajadores simulada para hacer el mapeo
import s from './Catalog.module.css'

const Catalog = () => {
    const dispatch = useDispatch()
    const workers =  useSelector(state => state.workers) // el array de workers real sacado de redux (se utilizaría una vez que haya trabajadores en la base de datos)
    
useEffect(()=>{

        dispatch(getWorkers())
},[dispatch])


    return (
    <div className={s.OutterCardsDIV}>
         <div className={s.CardsDIV}>
            {workers.length === 0 ? <h1>Loading...</h1> : workers.map(worker => (
                <div key={worker.ID} >
                <WorkerCard
                Worker={worker}            
                User={worker.User}
                Jobs={worker.Jobs}
                Contracts={worker.Contracts}/>   
                </div>
            ))}
        </div>
    </div>
    )
}

export default Catalog