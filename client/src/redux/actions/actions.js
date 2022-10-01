// export const action = () => async (dispatch) => {}
import axios from "axios";
import {LOADING,GET_USERS_CONTRACTS,GET_WORKER_DETAIL, GET_WORKERS, GET_JOBS, GET_USERS, GET_USERNAME, POST_USER, GET_WORKERS_PREMIUM, LOGIN_SUCCES , GET_WORKERS_SEARCH } from './actions_vars'

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
    dispatch({
      type:GET_WORKERS_SEARCH,
      payload: search
    })
  }
}

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

