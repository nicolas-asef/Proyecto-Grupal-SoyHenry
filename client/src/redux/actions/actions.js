// export const action = () => async (dispatch) => {}
import { Action } from "@remix-run/router";
import axios from "axios";
import {PUT_WORKER, PUT_WORKER_PREMIUM, PAY,LOADING,GET_WORKER_CONTRACTS,GET_USERS_CONTRACTS,GET_USER_DETAIL,GET_WORKER_DETAIL, GET_WORKERS, GET_JOBS, GET_USERS, GET_USERNAME, POST_USER, LOGIN_SUCCES , GET_WORKERS_SEARCH, ORDER_BY_RATING, FILTER, RESET,TEMPORAL_LOGOUT, PUT_USER, GET_USER_ID,GET_COUNTRIES, UPLOAD_IMAGE, CLEAN_DETAIL } from './actions_vars'

const baseURL = "http://localhost:3001/" //Esto se cambia por localhost:3001 para usarlo local

export function getWorkers(query, search){

  return function (dispatch) {
    axios.get(baseURL+"worker")
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
//     return fetch(baseURL+"contract/user",{
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


export function modifyContract(data,id){
  fetch(baseURL+'contract/'+id,{
    method:'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
  })
  .then(data => console.log(data))
  .catch(error => console.log(error))
}

export function createContract(data){
  fetch(baseURL+'contract',{
    method:'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
  })
  .then(data => console.log(data))
  .catch(data => alert(data))
}

export function getContractUsers(ids){

  let ides = ids.reduce((acum,e) => acum+"&arr="+e,"arr=")
  ides = ides.slice(5,ides.length)
  return function(dispatch){
    dispatch({ type: LOADING });
    return fetch(baseURL+"contract/user?"+ides)
    .then(data =>{ 
      return data.json()})
    .then(json => {
      
      dispatch({type:GET_WORKER_CONTRACTS,payload:json})
    })
    .catch(error => {dispatch({type:GET_WORKER_CONTRACTS,payload:{}})
    })
  }
}


export function getContractWorker(ids){

  let ides = ids.reduce((acum,e) => acum+"&arr="+e,"arr=")
  ides = ides.slice(5,ides.length)
  console.log(ides === "")
  if(ides !== "")
  return function(dispatch){
    dispatch({ type: LOADING });
    return fetch(baseURL+"contract/worker?"+ides)
    .then(data =>{ 
      return data.json()})
    .then(json => {
      dispatch({type:GET_USERS_CONTRACTS,payload:json})
    })
    .catch(error => {console.log("error------>",error)})
  }
  else 
    return function(dispatch){
      dispatch({type:GET_USERS_CONTRACTS,payload:[]})
    }
}


// export function getUserId(id) {
//   return function (dispatch) {
//     axios
//         .get(baseURL+"users/" + id)
//         .then((u) => {
//             dispatch({
//                 type: GET_USER_ID,
//                 payload: u.data,
//             });
//         })
//         .catch((err) => {
//             console.log(err);
//         });
// };
// }


export function getUserDetail(id){
  
  return function(dispatch){
    
    dispatch({ type: LOADING });
    
    return fetch(baseURL+"users/"+id)
    .then(data => {
      return data.json()})
    .then(json => {
      dispatch({type:GET_USER_DETAIL,payload:json})
      return json;
    })
  }
}

export function getUsers() {
    return function (dispatch) {
        axios
            .get(baseURL+"users")
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
            .get(baseURL+"users?name=" + search)
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
    const user = await axios.post(baseURL+"users", payload);
    const user_id = await user.data.ID;
    /* if(jobs.length) {
      const worker = {
        user_id,
        jobs,

      }
      const res = await axios.post(baseURL+"worker", worker);
    }
      */

    dispatch({
      type: POST_USER,
    });
    return user;
  };

}

export function getJobs() {
    return async function (dispatch) {
        try {
            let jobs = await axios.get(baseURL+"jobs");
            return dispatch({ type: GET_JOBS, payload: jobs.data });
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

  if (job === 'all' && disponibilidad === 'all' && zona === 'all'){
    filterArray = array
  }

  if (job !== 'all' && disponibilidad !== 'all' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        if (el.name === job && array[i].User.status === disponibilidad && array[i].User.Country.name === zona){
          filterArray.push(array[i])
        }
      })
    }
  }
  
  if (job !== 'all' && disponibilidad === 'all' && zona === 'all'){
    for (let i = 0; i < array.length; i++) {
      
      array[i].Jobs.map(el => {
        if (el.name === job){
          filterArray.push(array[i])
        }
      })
    }
  }
  if (job === 'all' && disponibilidad !== 'all' && zona === 'all'){
    for (let i = 0; i < array.length; i++) {
      if (array[i].User.status === disponibilidad){
        filterArray.push(array[i])
      }
    }
  }
  if (job === 'all' && disponibilidad === 'all' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      if(array[i].User.Country.name === zona){
        filterArray.push(array[i])
      }
    }
  }
  
  if (job !== 'all' && disponibilidad !== 'all' && zona === 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        console.log(el)
        if (el.name === job && array[i].User.status === disponibilidad){

          filterArray.push(array[i])
        }
      })
    }
  }
  if (job === 'all' && disponibilidad !== 'all' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      if (array[i].User.status === disponibilidad && array[i].User.Country.name === zona){
        filterArray.push(array[i])
      }
    }
  }
  if (job !== 'all' && disponibilidad === 'all' && zona !== 'all'){
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map(el => {
        if (el.name === job && array[i].User.Country.name === zona){
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
      const res = await axios.post(baseURL+"auth", credentials);
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


export function get_countries() {
  return async function (dispatch) {
    try {
      let countries = await axios.get(baseURL+"countries")
      dispatch ({type: GET_COUNTRIES, payload: countries.data})
    } catch (error) {
      console.log("------------------------->ENTRE")
      return error.response.status
    }
  }
}

export function updateUser(payload, payloadId) {
  return async function(dispatch){
    console.log(payload)
    const user = await axios.put(baseURL+"users/" + payloadId , payload);
    dispatch({
      type: PUT_USER,
    });
    //return user;
  } 
}

export function getUserId(id) {
  return function (dispatch) {
    axios
        .get(baseURL+"users/" + id)
        .then((u) => {
            dispatch({
                type: GET_USER_ID,
                payload: u.data,
            });
        })
        .catch((err) => {
            console.log(err)
        });
};
}


export function finishUserCreation(id, data, jobs) {
  return async function (dispatch) {
    const {name, lastName,phone, dni, location } = data;
    const toSend = {
      name,
      lastName,
      phone,
      dni,
      countryId: location,
      onBoarded: true
    }

    const user = await axios.put(`http://localhost:3001/users/${id}`, toSend);

    if(jobs.length) {
      const worker = {
        user_id: id,
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

export function pay( paymentMethod ) {
    //cambiar estado premium del modelo  de wokrers
  return async function(dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/payments", { paymentMethod });
      
      const r = response.data;
      dispatch({
        type: PAY
      });
      return response.data
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}

export function premiumPay(payload) {
  return async function(dispatch){
    const worker = await axios.put("http://localhost:3001/worker/" + payload, {premium: true});
    dispatch({
      type: PUT_WORKER_PREMIUM,
    });
    return "worker";
  } 
}


export function updateWorker(payload, payload2, payloadId) {
  return async function(dispatch){
    payload.jobs = payload2
    console.log(payload)
    console.log("accions")
    const worker = await axios.put("http://localhost:3001/worker/" + payloadId , payload);
    console.log(worker)
    dispatch({
      type: PUT_WORKER,
    });
    return worker;
  } 
}

// export async function updateWorkerJobs(payload, payloadId) {
//   return async function(dispatch){
//   console.log(payload)
//     const worker = await axios.put(baseURL+"worker/" + payloadId , payload);
//     dispatch({
//       type: PUT_WORKER,
//     });
//     return worker; 
//   }
// }

export const uploadImage = (formData) => (dispatch) => {
        axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_KEY}/image/upload`, formData)
        .then((res) =>res.data)
        .then(res => { 
            dispatch({
              type: UPLOAD_IMAGE,
              payload: res
          });
        } )
}

export const cleanDetail = () => (dispatch) => {
  dispatch({type: CLEAN_DETAIL})
}

export const changeStatus =  (payload, status) => async (dispatch) => {
  const online = await axios.put("http://localhost:3001/users/" + payload, {isOnline: status});
}