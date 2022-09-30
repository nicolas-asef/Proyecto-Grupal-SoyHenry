import {GET_USERS, GET_USERNAME, POST_USER, GET_JOBS, GET_WORKERS_PREMIUM, GET_WORKERS, GET_WORKERS_SEARCH} from "../actions/actions_vars"



const initialState = {
  workers: [],
  users: [],
  jobs: [],
  workersPremium: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
        return {
          ...state,            
          users: action.payload            
        }
    case GET_USERNAME:
      return {
        ...state,        
        users: action.payload
      }
    case POST_USER:
        return {
          ...state
        }
    case GET_JOBS: 
      return{
        ...state,
        jobs : action.payload
    }
    case GET_WORKERS_PREMIUM:
      return {
        ...state,
        workersPremium: action.payload
      }
    case GET_WORKERS:
      return {
        ...state,
        workers: action.payload
      }
    case GET_WORKERS_SEARCH:
      
      let filtrado = state.workers.filter( (e) => e.User.name.toLowerCase().includes(action.payload.toLowerCase()))
      if(filtrado.length === 0) {
        filtrado = state.workers.filter( c => c.Jobs.some( j => j.name.toLowerCase() === action.payload.toLowerCase()))
        //filtrado = state.workers.filter( (e) => e.Jobs[0].name.includes(action.payload))
        //filtrado = state.workers.filter((e) => e.Jobs.filter((e) => e.name.includes(action.payload))) 
        //filtrado = state.workers.filter( (e) => e.Jobs.map(e => e.name.includes(action.payload)))      
        
        // for (let i = 0; i < state.workers.length; i++) {
        //   const worker = state.workers[i]
        //   for (let k = 0; k < worker.Jobs.length; k++) {
        //     const job = worker.Jobs[i]
        //     if(job === action.payload){
        //       filtrado.push(worker)
        //     }
        //   }
          
        // }
      }
    return {
        ...state,
        workers: filtrado
      }
    default:
      return state;
  }
}

export default reducer;