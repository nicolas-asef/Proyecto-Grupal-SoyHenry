import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Banner from '../../img/banner.png';
import './Worker.css'
import Profile from './Profile';
import Stats from './Stats';
import Opinion from './Opinion';
import { Pagination, Skeleton } from '@mui/material';
import Filters from './Filters';
import { getWorkerDetail,getContractUsers } from '../../redux/actions/actions';
import { useParams } from 'react-router-dom';

export const Worker = ({getWorkerDetail,getContractUsers,worker,users,isLoading}) => {

  const id = useParams().id
  const [pag,setPag] = useState(1)
  const [maxPag,setMaxPag] = useState(0)
  const contractsVisualized = []
  const [valoraciones,setValoraciones] = useState([])
  const [promedioRating,setpromedioRating] = useState(0)
  const [finishedJobs,setFinishedJobs] = useState(0)
  const [listaValoraciones,setListaValoraciones] = useState([])
  const [forzarCambio, setForzarCambio] = useState(false)
  useEffect(() =>{
    getWorkerDetail(id)

  },[])


  useEffect(() =>{
    if(Object.keys(worker).length !== 0){
      worker.User.name = worker.User.lastName + " " + worker.User.name  
      worker.Jobs = worker.Jobs.map(e => e.name)
      const contratos = []
      worker.Contracts.forEach(e => contratos.push(e.id))
      getContractUsers(contratos)
    }
    
  },[worker])


  useEffect(() =>{
    if(users){
      setListaValoraciones(users)
    }
  },[users])


  useEffect(() =>{
    
    let auxiliarTerminados = 0
    let auxiliarPromedio = 0
    setMaxPag(Math.ceil(users.length/5))
    listaValoraciones.forEach(e => {

      const elemento = {
        name : e.User.lastName + " "+ e.User.name,
        img : e.User.img,
        // comment: e.comment_U
        comment:"Este chico me cae bien",
        // rating: e.rating_U
        rating: 4.2
      }

      auxiliarTerminados++
      auxiliarPromedio = (elemento.rating+auxiliarPromedio)
      contractsVisualized.push(elemento)
      })
      auxiliarPromedio = auxiliarPromedio/auxiliarTerminados
      setFinishedJobs(auxiliarTerminados)
      setpromedioRating(auxiliarPromedio)
      //
     
      setValoraciones(contractsVisualized.slice(5*(pag-1),5*pag))
  },[listaValoraciones,forzarCambio,pag])

  const handleChange = (e) => {
    console.log((e.target.innerText))
    setPag(e.target.innerText)
    // console.log(contractsVisualized)
    // setValoraciones(contractsVisualized.slice(5*(pag-1),5*pag))
    
  }

  const ordenarFiltrados = (tipo) => {
    if(tipo == 'r'){
      const auxiliar = listaValoraciones.sort((a,b) => (a.date > b.date) ? 1 : -1)
      console.log(auxiliar)
      setListaValoraciones(auxiliar)
      setForzarCambio(!forzarCambio)
    }
    if(tipo === 'p'){
      const auxiliar = listaValoraciones.sort((a,b) => (a.rating_U > b.rating_U) ? 1 : -1)
      console.log(auxiliar)
      setListaValoraciones(auxiliar)
      setForzarCambio(!forzarCambio)
    }
    if(tipo === 'n'){
      const auxiliar = listaValoraciones.sort((a,b) => (a.rating_U > b.rating_U) ? -1 : 1)
      console.log(auxiliar)
      setListaValoraciones(auxiliar)
      setForzarCambio(!forzarCambio)
    }
  }
  

  return (
    <>
    {isLoading? 
    <Skeleton variant="circular">
     </Skeleton>
    
    : 

      <div className="worker">
        <div className="w-left">
          {worker.User ? <Profile name = {worker.User.name} jobs = {worker.Jobs} description="Me encanta hablar" available="A veces si a veces no" status = "Online"/> : <Skeleton variant = "circular">
          <Profile/>
          </Skeleton> }
        </div>

      <div className="w-portada">
          <img src={Banner} alt='banner'/>
      </div>
      <div className="w-right">
          {finishedJobs > 0? <Stats finishedJobs={finishedJobs} promedioRating = {promedioRating}/>: <></>}
          {worker.User ? <>
          <div className="filters">
            <Filters filtrado = {ordenarFiltrados}/>
          </div>
          <Opinion contratos={valoraciones} />
          <div className="pagination">
            {maxPag > 0  ?  <Pagination count={maxPag} onChange={handleChange} hidePrevButton hideNextButton/> :<></>}
          </div></>: <></>}
          
      </div>
    </div>
    }

    </>
    
  )
}

const mapStateToProps = (state) => ({
  worker : state.workerDetail,
  users: state.selectedContracts,
  isLoading: state.isLoading
})

function mapDispatchToProps (dispatch) {
  return {
  getWorkerDetail : (id) => dispatch(getWorkerDetail(id)),
  getContractUsers : (ids) => dispatch(getContractUsers(ids))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Worker)