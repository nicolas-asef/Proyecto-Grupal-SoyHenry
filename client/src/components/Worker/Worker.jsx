import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Banner from '../../img/banner.png';
import './Worker.css'
import Profile from './Profile';
import Stats from './Stats';
import Opinion from './Opinion';
import { Pagination, Skeleton } from '@mui/material';
import Filters from './Filters';
import { getUserDetail,getContractUsers, getContractWorker } from '../../redux/actions/actions';
import { useParams } from 'react-router-dom';
import Buttons from './Buttons';
import Footer from '../Footer/Footer';

export const Worker = ({authState,getUserDetail,getContractWorker,getContractUsers,user,users,isLoading}) => {

  const id = useParams().id
  const [pag,setPag] = useState(1)
  const [maxPag,setMaxPag] = useState(0)
  const contractsVisualized = []
  const [valoraciones,setValoraciones] = useState([])
  const [promedioRating,setpromedioRating] = useState(0)
  const [finishedJobs,setFinishedJobs] = useState(0)
  const [listaValoraciones,setListaValoraciones] = useState([])
  const [forzarCambio, setForzarCambio] = useState(false)
  const [worker, setWorker] = useState({})

  useEffect(() =>{
    getUserDetail(id)
  },[])




  useEffect(() =>{ 
    let nuevoObjeto = {}
    if(Object.keys(user).length !== 0 ){
      const contratos = []
      user.Contracts.forEach(e => contratos.push(e.id))
      nuevoObjeto.User= {}
        nuevoObjeto.User.name = user.lastName + " " + user.name  
        nuevoObjeto.User.img = user.img
      if(user.Worker){
        nuevoObjeto.Jobs = user.Worker.Jobs[0].name? user.Worker.Jobs.map(e => e.name) : user.Worker.Jobs
        getContractUsers(contratos)
        
      }else {
        getContractWorker(contratos)
      }
      setWorker(nuevoObjeto)
    }
  },[user])


  useEffect(() =>{
    if(users && Array.isArray(users)){
      setListaValoraciones(users)
    }
  },[users])


  useEffect(() =>{
    
    let auxiliarTerminados = 0
    let auxiliarPromedio = 0
    setMaxPag(Math.ceil(users.length/5))
    if(Object.keys(listaValoraciones).length !== 0){
      let variableComent = "comment_W"
      let variableRating = "rating_W"
      let variableId = "WorkerID"
      if(user.Worker){
        variableComent = "comment_U"
        variableRating = "rating_U"
        variableId = "UserID"
      }
      listaValoraciones.forEach(e => {
      const elemento = {
        id: e[variableId],
        name : e.User.lastName + " "+ e.User.name,
        img : e.User.img,
        comment: e[variableComent],
        rating: e[variableRating]
      }

      auxiliarTerminados++
      auxiliarPromedio = (elemento.rating+auxiliarPromedio)
      contractsVisualized.push(elemento)
      })}
      auxiliarPromedio = auxiliarPromedio/auxiliarTerminados
      setFinishedJobs(auxiliarTerminados)
      setpromedioRating(auxiliarPromedio)
      setValoraciones(contractsVisualized.slice(5*(pag-1),5*pag))
  },[listaValoraciones,forzarCambio,pag])

  const handleChange = (e) => {
    setPag(e.target.innerText)
    
  }

  const ordenarFiltrados = (tipo) => {
    if(tipo == 'r' ){
      const auxiliar = listaValoraciones.sort((a,b) => (a.date > b.date) ? 1 : -1)
      setListaValoraciones(auxiliar)
      setForzarCambio(!forzarCambio)
    }
    if(tipo === 'p'){
      const auxiliar = listaValoraciones.sort((a,b) => (a.rating_U > b.rating_U) ? -1 : 1)

      setListaValoraciones(auxiliar)
      setForzarCambio(!forzarCambio)
    }
    if(tipo === 'n'){
      const auxiliar = listaValoraciones.sort((a,b) => (a.rating_U > b.rating_U) ? 1 : -1)

      setListaValoraciones(auxiliar)
      setForzarCambio(!forzarCambio)
    }
  }
  

  return (
    <>
    {isLoading? 
    <h1>Cargando...</h1>
    
    : <>
    <div className="worker">
      <div className="w-portada">
          <img src={Banner} alt='banner'/>
      </div>
      <div className="w-content">
        <div className="w-left">
            {worker.User && worker.User.name ? <Profile img = {worker.User.img} name = {worker.User.name} jobs = {worker.Jobs} description={worker.description} status = {authState.isLoggedIn}/> : <Skeleton variant = "circular">

            </Skeleton> }
          </div>

        <div className="w-right">
            {finishedJobs > 0? <Stats finishedJobs={finishedJobs} promedioRating = {promedioRating} texto = {worker.Jobs? "terminados" : "requeridos"}/>: <Stats finishedJobs={0} promedioRating = {0} texto = {worker.Jobs? "terminados" : "requeridos"}/>}
            
            {worker.User ? <>
            <div className="filters">
              <Filters filtrado = {ordenarFiltrados}/>
            </div>
            <Opinion contratos={valoraciones} tipo = {worker.Jobs} />
            
              {maxPag > 0 && finishedJobs > 0 ?  <div className="pagination"><Pagination count={maxPag} onChange={handleChange} hidePrevButton hideNextButton/> </div>:<></>}
            </>: <></>}
            
        </div>
      </div>
    </div>
    <Footer />
    </>
 
    }

    </>
    
  )
}

const mapStateToProps = (state) => ({
  worker : state.workerDetail,
  users: state.selectedContracts,
  isLoading: state.isLoading,
  user: state.userDetail,
  authState: state.authState
})

function mapDispatchToProps (dispatch) {
  return {

  getUserDetail : (id) => dispatch(getUserDetail(id)),
  getContractUsers : (ids) => dispatch(getContractUsers(ids)),
  getContractWorker: (ids) => dispatch(getContractWorker(ids))

  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Worker)