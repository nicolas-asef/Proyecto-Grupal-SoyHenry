import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter, getJobs, orderByRating } from '../../redux/actions/actions';
// import NavBar from "../NavBar/NavBar";
// import { useLocation } from "react-router-dom";


const Home = () => {

	const [order, setOrder] = useState('')
	const [job, setJob] = useState('all')
	const [available, setAvailable] = useState('available')
	const [zone, setZone] = useState('all')
	const worker = useSelector (worker => worker.workers)
	const filtrado = useSelector (worker => worker.allWorkers)

	const dispatch = useDispatch()

	const orderBy = (e) => {
		dispatch(orderByRating(worker, e.target.value))
		setOrder(`ordenado ${e.target.value}`)
	}

	const filterjob = (e) => {
		e.preventDefault()
		setJob(e.target.value)
		dispatch(filter(filtrado, e.target.value ,available, zone))
	}

	const filterAvailable = (e) => {
		e.preventDefault()
		setAvailable(e.target.value)
		dispatch(filter(filtrado, job, e.target.value, zone))
	}

	const filterZone = (e) => {
		e.preventDefault()
		setZone(e.target.value)
		dispatch(filter(filtrado,job, available, e.target.value))
	}



	useEffect(() => {
		dispatch(getJobs())
	},[dispatch])

	return (
		<div>
			<h2>Ordenamiento</h2>
			<select onChange={(e) => orderBy(e)}>
				<option value="select">Seleccionar</option>
				<option value="maxRating">Mayor Rating</option>
				<option value="minRating">Menor Rating</option>
			</select>

			<select onChange={(e) => filterjob(e)}>
				<option value="all">all</option>
				<option value="Vendedor">Vendedor</option>
				<option value="Pintor">Pintor</option>
				<option value="Ingeniero">Ingeniero</option>
				<option value="Carpintero">Carpintero</option>
				<option value="Plomero">Plomero</option>
				<option value="Programador">Programador</option>
				<option value="Electricista">Electricista</option>
			</select>

			<select onChange={(e) => filterAvailable(e)}>
				<option value="available">available</option>
				<option value="Online">Online</option>
				<option value="Offline">Offline</option>
			</select>

			<select onChange={(e) => filterZone(e)}>
				<option value="all">all</option>
				<option value="Buenos aires">Buenos aires</option>
				<option value="Cordoba">Cordoba</option>
				<option value="San Luis">San Luis</option>
				<option value="Chaco">Chaco</option>
			</select>	

			{worker && worker.map( worker => {
				return (
					<h1 key={worker.id}>{worker.nombre} - rating: {worker.rating} - job: {worker.Jobs[0].nombre}/{worker.Jobs[1].nombre} - disponibilidad: {worker.available}, zona: {worker.zona}</h1>
				)
			})}
		</div>

	)

};

export default Home;
