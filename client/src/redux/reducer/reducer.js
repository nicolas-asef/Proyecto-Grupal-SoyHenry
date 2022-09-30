import {GET_USERS, GET_USERNAME, POST_USER, GET_JOBS, GET_WORKERS_PREMIUM, ORDER_BY_RATING, FILTER} from "../actions/actions_vars"



const initialState = {
  workers: [{
    nombre: "Lucas",
    lastname: "Viotti",
    img: "link",
    available: "Offline",
    rating: 5,
    Jobs: [
      {
        id: "c0422577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Plomero",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Carpintero",
      }
    ]

  },
  {
    nombre: "Feli",
    lastname: "Liziano",
    img: "link",
    available: "Online",
    rating: 4,
    Jobs: [
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Ingeniero",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Carpintero",
      }
    ]
  },
  {
    nombre: "Manuel",
    lastname: "Lokito",
    img: "link",
    available: "Offline",
    rating: 3,
    Jobs: [
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Vendedor",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Pintor",
      }
    ]
  },
  {
    nombre: "Guillermo",
    lastname: "Gonzales",
    img: "link",
    available: "Online",
    rating: 5,
    Jobs: [
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Programador",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Electricista",
      }
    ]
  }],
  allWorkers: [{
    nombre: "Lucas",
    lastname: "Viotti",
    img: "link",
    zona: "Buenos aires",
    available: "Offline",
    rating: 5,
    Jobs: [
      {
        id: "c0422577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Plomero",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Carpintero",
      }
    ]

  },
  {
    nombre: "Feli",
    lastname: "Liziano",
    img: "link",
    available: "Online",
    rating: 4,
    zona: "Cordoba",
    Jobs: [
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Ingeniero",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Carpintero",
      }
    ]
  },
  {
    nombre: "Manuel",
    lastname: "Lokito",
    img: "link",
    available: "Offline",
    zona: "San Luis",
    rating: 3,
    Jobs: [
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Vendedor",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Pintor",
      }
    ]
  },
  {
    nombre: "Guillermo",
    lastname: "Gonzales",
    img: "link",
    available: "Online",
    zona: "Chaco",
    rating: 5,
    Jobs: [
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fc15",
        nombre: "Programador",
      },
      {
        id: "c0462577-7835-42dc-ac52-81321dc2fw15",
        nombre: "Electricista",
      }
    ]
  }],
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