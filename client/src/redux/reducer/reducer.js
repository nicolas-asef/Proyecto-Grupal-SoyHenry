import {GET_USERS, GET_USERNAME, POST_USER, GET_JOBS, GET_WORKERS_PREMIUM, ORDER_BY_RATING, FILTER} from "../actions/actions_vars"



const initialState = {
  workers: [],
  allWorkers: [],
  users: [],
  jobs: [],
  workersPremium: []
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
        return {
          ...state,            
          users: action.payload,
          allWorkers: action.payload         
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
    case ORDER_BY_RATING:{
      return {
        ...state,
        workers: action.payload
      }
    }
    case FILTER: {
      return {
        ...state,
        workers: action.payload
      }
    }
    default:
      return state;
  }
}

export default reducer;