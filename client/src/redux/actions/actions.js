// export const action = () => async (dispatch) => {}
import axios from "axios";
import { GET_JOBS, GET_USERS, GET_USERNAME, POST_USER, GET_WORKERS_PREMIUM, ORDER_BY_RATING, FILTER } from './actions_vars'


export function getUsers() {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/users")
      .then((u) => {
        dispatch({
          type: GET_USERS,
          payload: u.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getUsersName(search) {
  return function (dispatch) {
    axios
      .get("http://localhost:3001/users?name=" + search)
      .then((u) => {
        dispatch({
          type: GET_USERNAME,
          payload: u.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function createUser(payload) {
  return async function (dispatch) {
    const user = await axios.post("http://localhost:3001/users", payload);
    const user_id = await user.data.ID;
    if(payload.work) {
      const worker = {
        user_id,
        jobs: payload.work,
        certification: payload.certificate

      }
      const res = await axios.post("http://localhost:3001/worker", worker);
    }

    dispatch({
      type: POST_USER,
    });
    return user;
  };
}

export function getJobs() {
  return async function (dispatch) {
    try {
      let jobs = await axios.get("http://localhost:3001/jobs");
      return dispatch({ type: GET_JOBS, payload: jobs.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getWokersPremium() {
  return async function (dispatch) {
    try {
      // let premium = await axios.get("http://localhost:3001/workers_premium");
      return dispatch({ type: GET_WORKERS_PREMIUM, payload: premium }); // payload: premium.data
    } catch (error) {
      console.log(error);
    }
  };
}

export function orderByRating(array, orderBy){

  function order( a, b )
  {
    if ( a.rating < b.rating){
      return 1;
  }
  if ( a.rating > b.rating){
      return -1;
  }
  return 0;
  }

  if (orderBy === 'maxRating'){
    array.sort(order)
  } 
  if (orderBy === 'minRating') {
    array.sort(order).reverse()
  }
  return function (dispatch){
    dispatch ({type: ORDER_BY_RATING, payload: array})
  }
}

export function filter(array, job, disponibilidad, zona){
  let filterArray = []
  console.log(job, zona)

  if (job === 'all' && disponibilidad === 'available' && zona === 'all'){
    filterArray = array
  }

  if (job !== 'all' && disponibilidad !== 'available' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        if (el.nombre === job && array[i].available === disponibilidad && array[i].zona === zona){
          filterArray.push(array[i])
        }
      })
    }
  }

  if (job !== 'all' && disponibilidad === 'available' && zona === 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        if (el.nombre === job){
          filterArray.push(array[i])
        }
      })
    }
  }
  if (job === 'all' && disponibilidad !== 'available' && zona === 'all'){
    for (let i = 0; i < array.length; i++) {
      if (array[i].available === disponibilidad){
        filterArray.push(array[i])
      }
    }
  }
  if (job === 'all' && disponibilidad === 'available' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      if(array[i].zona === zona){
        filterArray.push(array[i])
      }
    }
  }

  if (job !== 'all' && disponibilidad !== 'available' && zona === 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        if (el.nombre === job && array[i].available === disponibilidad){
          filterArray.push(array[i])
        }
      })
    }
  }
  if (job === 'all' && disponibilidad !== 'available' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      if (array[i].available === disponibilidad && array[i].zona === zona){
        filterArray.push(array[i])
      }
    }
  }
  if (job !== 'all' && disponibilidad === 'available' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        if (el.nombre === job && array[i].zona === zona){
          filterArray.push(array[i])
        }
      })
    }
  }
  return function (dispatch){
    dispatch({type: FILTER, payload: filterArray})
  }
}


// Estos son los workers harcodeados, NO DEBE IR A LA MAIN
const premium = [
  {
    nombre: "Lucas",
    lastname: "Viotti",
    img: "link",
    job: "Albañil",
    status: "Online"
  },
  {
    nombre: "Feli",
    lastname: "Liziano",
    img: "link",
    job: "Obrero",
    status: "Online"
  },
  {
    nombre: "Manuel",
    lastname: "Lokito",
    img: "link",
    job: "Pintor",
    status: "Offline"
  },
  {
    nombre: "Guillermo",
    lastname: "Gonzales",
    img: "link",
    job: "Durlero",
    status: "Online"
  }
] 

