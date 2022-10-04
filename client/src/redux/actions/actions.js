// export const action = () => async (dispatch) => {}
import axios from "axios";
import {LOADING,GET_USERS_CONTRACTS,GET_WORKER_DETAIL, GET_WORKERS, GET_JOBS, GET_USERS, GET_USERNAME, POST_USER, GET_WORKERS_PREMIUM, LOGIN_SUCCES , GET_WORKERS_SEARCH, ORDER_BY_RATING, FILTER, RESET,TEMPORAL_LOGOUT, PUT_USER, GET_USER_ID } from './actions_vars'

export function getWorkers(query, search){


  return function (dispatch) {
    axios.get("http://localhost:3001/worker")
    .then((w) => {
      dispatch({
        type: GET_WORKERS,
      payload: w.data
    });
  })
  .catch((err) => {
    console.log(err)
  })
}

}

// export function getContractUsers(ids){
//   return function(dispatch){
//     dispatch({ type: LOADING });
//     return fetch("http://localhost:3001/contract/user",{
//       method:'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(ids)
//       })
//   }
//   .then(data => data.json())
//   .then(json => {
//     dispatch({type:GET_WORKER_DETAIL,payload:json})
//   })
// }

export function getContractUsers(ids){

  let ides = ids.reduce((acum,e) => acum+"&arr="+e,"arr=")
  ides = ides.slice(5,ides.length)
  return function(dispatch){
    dispatch({ type: LOADING });
    return fetch("http://localhost:3001/contract/user?"+ides)
    .then(data =>{ 
      return data.json()})
    .then(json => {
      
      dispatch({type:GET_USERS_CONTRACTS,payload:json})
    })
    .catch(error => {dispatch({type:GET_USERS_CONTRACTS,payload:{}})
    })
  }
}

export function getWorkerDetail(id){
  
  return function(dispatch){
    
    dispatch({ type: LOADING });
    
    return fetch("http://localhost:3001/worker/"+id)
    .then(data => {

      return data.json()})
    .then(json => {
      dispatch({type:GET_WORKER_DETAIL,payload:json})
    })
  }
}

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

export function getWorkersSearch(search) {
  return function (dispatch) {    
    dispatch({ type: RESET })
    dispatch({
      type:GET_WORKERS_SEARCH,
      payload: search
    })
  }
}



export function createUser(payload, jobs) {

  return async function (dispatch) {
    const user = await axios.post("http://localhost:3001/users", payload);
    const user_id = await user.data.ID;
    if(jobs.length) {
      const worker = {
        user_id,
        jobs,

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

export function getWorkersPremium() {
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
export function authenticate(credentials) {
  return async function (dispatch) {
    try {
      const res = await axios.post("http://localhost:3001/auth", credentials);
      const { data } = res;
      dispatch({ type: LOGIN_SUCCES, payload: data});
    } catch (error) {
      return error.response.status
    }
  };
}

export function temporalLogout() {
  return async function (dispatch) {
    dispatch({type: TEMPORAL_LOGOUT})
  }
}

export function updateUser(payload, payloadId) {
  return async function(dispatch){
    console.log(payload)
    const user = await axios.put("http://localhost:3001/users/" + payloadId , payload);
    dispatch({
      type: PUT_USER,
    });
    return user;
  } 
}

export function getUserId(id) {
  return function (dispatch) {
    axios
        .get("http://localhost:3001/users/" + id)
        .then((u) => {
            dispatch({
                type: GET_USER_ID,
                payload: u.data,
            });
        })
        .catch((err) => {
            console.log(err);
        });
};
}



// Estos son los workers harcodeados, NO DEBE IR A LA MAIN
const premium = [
  {
    name: "Lucas",
    lastname: "Viotti",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Albañil",
    status: "Online",
    rating: 2
  },
  {
    name: "Feli",
    lastname: "Liziano",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Obrero",
    status: "Online",
    rating: 3
  },
  {
    name: "Manuel",
    lastname: "Lokito",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Pintor",
    status: "Offline",
    rating: 4
  },
  {
    name: "Guillermo",
    lastname: "Gonzales",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Durlero",
    status: "Online",
    rating: 5
  },
  {
    name: "Lucas",
    lastname: "Viotti",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Albañil",
    status: "Online",
    rating: 2
  },
  {
    name: "Feli",
    lastname: "Liziano",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Obrero",
    status: "Online",
    rating: 3
  },
  {
    name: "Manuel",
    lastname: "Lokito",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Pintor",
    status: "Offline",
    rating: 4
  },
  {
    name: "Guillermo",
    lastname: "Gonzales",
    image: "https://eststatic.com/2676/conversions/malas-personas-default.jpg",
    job: "Durlero",
    status: "Online",
    rating: 5
  }
] 
