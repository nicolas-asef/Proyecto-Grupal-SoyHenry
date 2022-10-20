import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Banner from '../../img/banner.png';
import './Worker.css'
import Profile from './Profile';
import Stats from './Stats';
import Opinion from './Opinion';
import { Pagination, Skeleton } from '@mui/material';
import Filters from './Filters';
import { getUserDetail,getContractUsers, getContractWorker, cleanDetail } from '../../redux/actions/actions';
import { useParams } from 'react-router-dom';
import Buttons from './Buttons';
import Footer from '../Footer/Footer';
import cardContracts from '../CardContracts/CardContracts';
import CardContracts from '../CardContracts/CardContracts';

export const Worker = ({type,authState,getUserDetail,getContractWorker,getContractUsers, user ,users,isLoading, cleanDetail}) => {

  const id = useParams().id
  const [pag,setPag] = useState(1)
  const [maxPag,setMaxPag] = useState(0)
  let contractsVisualized = []
  const [valoraciones,setValoraciones] = useState([])
  const [promedioRating,setpromedioRating] = useState(0)
  const [finishedJobs,setFinishedJobs] = useState(0)
  const [listaValoraciones,setListaValoraciones] = useState([])
  const [forzarCambio, setForzarCambio] = useState(false)
  const [worker, setWorker] = useState({})
  const [displaying, setDisplaying] = useState("")

  const forceUpdate = ()=> {
    if(type === "worker")
      type = "user"
    else 
      type = "worker"

    setPag(1)
    setMaxPag(0)
    contractsVisualized = []
    setValoraciones([])
    setpromedioRating(0)
    setFinishedJobs(0)
    setListaValoraciones([])
    setForzarCambio(false)
    setWorker({})
    setDisplaying("")
    setForzarCambio(!forzarCambio)
  }

  useEffect(() =>{
    
    getUserDetail(id)

    return () => {
      cleanDetail();
    } 
  },[forzarCambio])




  useEffect(() =>{ 
    let nuevoObjeto = {}
    if(Object.keys(user).length !== 0 ){
      const contratos = []
      nuevoObjeto.User= {}
      nuevoObjeto.User.name = user.lastName + " " + user.name  
      nuevoObjeto.User.img = user.img
      if(type === 'worker'){
        user.Worker?.Contracts.forEach(e => contratos.push(e.id))
        nuevoObjeto.Jobs = user.Worker?.Jobs[0].name? user.Worker?.Jobs.map(e => e.name) : user.Worker?.Jobs
        getContractUsers(contratos)
      } else {
        
        user.Contracts?.forEach(e => contratos.push(e.id))
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
    
    if(Object.keys(listaValoraciones).length !== 0){
      let variableComent = "comment_W"
      let variableRating = "rating_W"
      let variableId = null
      if(type === 'worker'){
        variableComent = "comment_U"
        variableRating = "rating_U"
        variableId = "UserID"
      }
      
      listaValoraciones.forEach(e => {
        if(e[variableComent]){
          const elemento = {
            id: variableId ? e[variableId] : e.Worker.UserID,
            name : e.User ? e.User.lastName + " "+ e.User.name : e.Worker.User.lastName + " "+ e.Worker.User.name  ,
            img : e.User? e.User.img : e.Worker.User.img,
            comment: e[variableComent],
            rating: e[variableRating]
          }
    
          auxiliarTerminados++
          auxiliarPromedio = (elemento.rating+auxiliarPromedio)
          contractsVisualized.push(elemento)
        }
      })
    }
      auxiliarPromedio = auxiliarPromedio/auxiliarTerminados
      setFinishedJobs(auxiliarTerminados)
      setpromedioRating(auxiliarPromedio)
      setMaxPag(Math.ceil(contractsVisualized.length/5))
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
  
  const ocultarFilters = (buleano) => {
    
    if(!buleano)
    setDisplaying("")
    else 
    setDisplaying("none")
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
        <div className="w-left" >
        {worker.User && worker.User.name ? <Profile id={user.Worker? user.Worker.ID : false} ocultarFilters={ocultarFilters} img = {worker.User.img} name = {worker.User.name} jobs = {worker.Jobs} description={worker.description} status = {authState.isLoggedIn}/> : <Skeleton variant = "circular">

          </Skeleton> }
          </div>

        <div className="w-right" style={{display:displaying}}>
            {finishedJobs > 0? <Stats finishedJobs={finishedJobs} promedioRating = {promedioRating} texto = {worker.Jobs? "terminados" : "requeridos"}/>: <Stats finishedJobs={0} promedioRating = {0} texto = {worker.Jobs? "terminados" : "requeridos"}/>}
            
            {worker.User ? <>
            <div className="filters-worker" style={{display:displaying}}>
              <Filters filtrado = {ordenarFiltrados}/>
            </div>
            <Opinion forceUpdate={forceUpdate} contratos={valoraciones} tipo = {worker.Jobs} />
            
              {maxPag > 0 && finishedJobs > 0 ?  <div className="pagination"><Pagination count={maxPag} onChange={handleChange} hidePrevButton hideNextButton/> </div>:<></>}
            </>: <></>}
            {/* <div className="contracts-worker">
              <h4>Contractos pendientes</h4>
              <CardContracts/></div> */}
            
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
  getContractWorker: (ids) => dispatch(getContractWorker(ids)),
  cleanDetail: () => dispatch(cleanDetail()) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Worker)