// export const action = () => async (dispatch) => {}
import { Action } from "@remix-run/router";
import axios from "axios";
import {
  DELETED_FAVORITE,
  ADD_FAVORITE,
  AGREGAR_SOCKET,
  PUT_WORKER,
  PUT_WORKER_PREMIUM,
  PAY,
  LOADING,
  GET_WORKER_CONTRACTS,
  GET_USERS_CONTRACTS,
  GET_USER_DETAIL,
  GET_WORKER_DETAIL,
  GET_WORKERS_PREMIUM,
  GET_WORKERS,
  GET_JOBS,
  GET_USERS,
  GET_USERNAME,
  POST_USER,
  LOGIN_SUCCES,
  GET_WORKERS_SEARCH,
  ORDER_BY_RATING,
  FILTER,
  RESET,
  TEMPORAL_LOGOUT,
  PUT_USER,
  GET_USER_ID,
  GET_COUNTRIES,
  UPLOAD_IMAGE,
  CLEAN_DETAIL,
  POST_COUNTRY,
  POST_JOB,
  DELETE_USER,
  DELETE_JOB,
  DELETE_COUNTRY,
} from "./actions_vars";
import { io } from "socket.io-client";

const URL = "http://localhost:3001/";
//const URL = "https://databasepf.herokuapp.com/"

const baseURL = "http://localhost:3001/"; //Esto se cambia por localhost:3001 para usarlo local

export function getWorkers(query, search) {
  return function (dispatch) {
    axios
      .get(baseURL + "worker")
      .then((w) => {
        dispatch({
          type: GET_WORKERS,
          payload: w.data,
        });
      })
      .catch((err) => {});
  };
}

export function agregarSocker(id) {
  return async function (dispatch) {
    const socket = await io(baseURL);
    await socket.emit("addUser", id);
    dispatch({ type: AGREGAR_SOCKET, payload: socket });
  };
}

export function sendNotification(email, type) {
  const info = { email, type };
  return function () {
    axios.post(`${baseURL}mailNotifications`, info);
  };
}

// export function getContractUsers(ids){
//   return function(dispatch){
//     dispatch({ type: LOADING });
//     return fetch(baseURL+"contract/user",{
//     return fetch(URL+"contract/user",{
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

export function modifyContract(data, id) {
  fetch(baseURL + "contract/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => data)
    .catch((error) => data);
}

export function createContract(data) {
  fetch(baseURL + "contract", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((data) => data)
    .catch((data) => data);
}

export function getContractUsers(ids) {
  let ides = ids.reduce((acum, e) => acum + "&arr=" + e, "arr=");
  ides = ides.slice(5, ides.length);
  return function (dispatch) {
    dispatch({ type: LOADING });
    return fetch(baseURL + "contract/user?" + ides)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        dispatch({ type: GET_WORKER_CONTRACTS, payload: json });
      })
      .catch((error) => {
        dispatch({ type: GET_WORKER_CONTRACTS, payload: {} });
      });
  };
}

export function getContractWorker(ids) {
  let ides = ids.reduce((acum, e) => acum + "&arr=" + e, "arr=");
  ides = ides.slice(5, ides.length);
  if (ides !== "")
    return function (dispatch) {
      dispatch({ type: LOADING });
      return fetch(baseURL + "contract/worker?" + ides)
        .then((data) => {
          return data.json();
        })
        .then((json) => {
          dispatch({ type: GET_USERS_CONTRACTS, payload: json });
        })
        .catch((error) => {});
    };
  else
    return function (dispatch) {
      dispatch({ type: GET_USERS_CONTRACTS, payload: [] });
    };
}

// export function getUserId(id) {
//   return function (dispatch) {
//     axios
//         .get(baseURL+"users/" + id)
//         .get(URL+"users/" + id)
//         .then((u) => {
//             dispatch({
//                 type: GET_USER_ID,
//                 payload: u.data,
//             });
//         })
//         .catch((err) => {
//
//         });
// };
// }

export function getUserDetail(id, type = GET_USER_DETAIL) {
  return function (dispatch) {
    dispatch({ type: LOADING });

    return fetch(baseURL + "users/" + id)
      .then((data) => {
        return data.json();
      })
      .then((json) => {
        dispatch({ type: type, payload: json });
        return json;
      });
  };
}

export function getUsers() {
  return function (dispatch) {
    axios
      .get(baseURL + "users")
      .then((u) => {
        dispatch({
          type: GET_USERS,
          payload: u.data,
        });
      })
      .catch((err) => {});
  };
}

export function getUsersName(search) {
  return function (dispatch) {
    axios.get(baseURL + "users?name=" + search).then((u) =>
      dispatch({
        type: GET_USERNAME,
        payload: u.data,
      })
    );
  }.catch((err) => {});
}

export function getWorkersSearch(search) {
  return function (dispatch) {
    dispatch({ type: RESET });
    dispatch({
      type: GET_WORKERS_SEARCH,
      payload: search,
    });
  };
}

export function createUser(payload, jobs) {
  return async function (dispatch) {
    const user = await axios.post(baseURL + "users", payload);
    const user_id = await user.data.ID;
    if (jobs.length) {
      const worker = {
        user_id,
        jobs,
      };
      const res = await axios.post(baseURL + "worker", worker);
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
      let jobs = await axios.get(baseURL + "jobs");
      return dispatch({ type: GET_JOBS, payload: jobs.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getWorkersPremium() {
  return async function (dispatch) {
    try {
      let premium = await axios.get(baseURL + "workers_premium");

      return dispatch({ type: GET_WORKERS_PREMIUM, payload: premium }); // payload: premium.data
    } catch (error) {}
  };
}

export function orderByRating(array, orderBy) {
  function order(a, b) {
    if (a.rating < b.rating) {
      return 1;
    }
    if (a.rating > b.rating) {
      return -1;
    }
    return 0;
  }

  if (orderBy === "maxRating") {
    array.sort(order);
  }
  if (orderBy === "minRating") {
    array.sort(order).reverse();
  }
  return function (dispatch) {
    dispatch({ type: ORDER_BY_RATING, payload: array });
  };
}

export function filter(array, job, disponibilidad, zona) {
  let filterArray = [];

  if (job === "all" && disponibilidad === "all" && zona === "all") {
    filterArray = array;
  }

  if (job !== "all" && disponibilidad !== "all" && zona !== "all") {
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map((el) => {
        if (
          el.name === job &&
          array[i].User.isOnline === disponibilidad &&
          array[i].User.Country.name === zona
        ) {
          filterArray.push(array[i]);
        }
      });
    }
  }

  if (job !== "all" && disponibilidad === "all" && zona === "all") {
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map((el) => {
        if (el.name === job) {
          filterArray.push(array[i]);
        }
      });
    }
  }
  if (job === "all" && disponibilidad !== "all" && zona === "all") {
    for (let i = 0; i < array.length; i++) {
      if (array[i].User.isOnline === disponibilidad) {
        filterArray.push(array[i]);
      }
    }
  }
  if (job === "all" && disponibilidad === "all" && zona !== "all") {
    for (let i = 0; i < array.length; i++) {
      if (array[i].User.Country.name === zona) {
        filterArray.push(array[i]);
      }
    }
  }

  if (job !== "all" && disponibilidad !== "all" && zona === "all") {
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map((el) => {
        if (el.name === job && array[i].User.isOnline === disponibilidad) {
          filterArray.push(array[i]);
        }
      });
    }
  }
  if (job === "all" && disponibilidad !== "all" && zona !== "all") {
    for (let i = 0; i < array.length; i++) {
      if (
        array[i].User.isOnline === disponibilidad &&
        array[i].User.Country.name === zona
      ) {
        filterArray.push(array[i]);
      }
    }
  }
  if (job !== "all" && disponibilidad === "all" && zona !== "all") {
    for (let i = 0; i < array.length; i++) {
      array[i].Jobs.map((el) => {
        if (el.name === job && array[i].User.Country.name === zona) {
          filterArray.push(array[i]);
        }
      });
    }
  }
  return function (dispatch) {
    dispatch({ type: FILTER, payload: filterArray });
  };
}

export function authenticate(credentials) {
  return async function (dispatch) {
    try {
      const res = await axios.post(baseURL + "auth", credentials);
      const { data } = res;
      dispatch({ type: LOGIN_SUCCES, payload: data });
    } catch (error) {
      return error.response.status;
    }
  };
}

export function temporalLogout() {
  return async function (dispatch) {
    dispatch({ type: TEMPORAL_LOGOUT });
  };
}

export function get_countries() {
  return async function (dispatch) {
    try {
      let countries = await axios.get(baseURL + "countries");
      dispatch({ type: GET_COUNTRIES, payload: countries.data });
    } catch (error) {
      return error.response.status;
    }
  };
}

export function updateUser(payload, payloadId) {
  return async function (dispatch) {
    const user = await axios.put(baseURL + "users/" + payloadId, payload);
    dispatch({
      type: PUT_USER,
    });
    //return user;
  };
}

export function getUserId(id) {
  return function (dispatch) {
    axios
      .get(baseURL + "users/" + id)
      .then((u) => {
        dispatch({
          type: GET_USER_ID,
          payload: u.data,
        });
      })
      .catch((err) => {});
  };
}

export function finishUserCreation(id, data, jobs) {
  return async function (dispatch) {
    const { name, lastName, phone, dni, location, city, street, address } =
      data;

    const coordinate = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${address},${street},${city},${location}&format=json`
    );

    if (!coordinate.data.length) {
      return { res: { status: 404 } };
    } else {
      const toSend = {
        name,
        lastName,
        phone,
        dni,
        city,
        street,
        address,
        location,
        coordinates: [coordinate.data[0].lat, coordinate.data[0].lon],
        onBoarded: true,
      };
      const user = await axios.put(`http://localhost:3001/users/${id}`, toSend);

      if (jobs.length) {
        const worker = {
          user_id: id,
          jobs,
        };
        const res = await axios.post("http://localhost:3001/worker", worker);
      }
      dispatch({
        type: POST_USER,
      });
      return user;
    }
  };
}

export function pay(paymentMethod) {
  //cambiar estado premium del modelo  de wokrers
  return async function (dispatch) {
    try {
      const response = await axios.post("http://localhost:3001/payments", {
        paymentMethod,
      });

      const r = response.data;
      dispatch({
        type: PAY,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  };
}

export function premiumPay(payload) {
  return async function (dispatch) {
    const worker = await axios.put("http://localhost:3001/worker/" + payload, {
      premium: true,
    });
    dispatch({
      type: PUT_WORKER_PREMIUM,
    });
    return "worker";
  };
}

export function updateWorker(payload, payload2, payloadId) {
  return async function (dispatch) {
    payload.jobs = payload2;
    const worker = await axios.put(
      "http://localhost:3001/worker/" + payloadId,
      payload
    );
    dispatch({
      type: PUT_WORKER,
    });
    return worker;
  };
}
export const uploadImage = (formData) => (dispatch) => {
  axios
    .post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_KEY}/image/upload`,
      formData
    )
    .then((res) => res.data)
    .then((res) => {
      dispatch({
        type: UPLOAD_IMAGE,
        payload: res,
      });
    });
};

export const cleanDetail = () => (dispatch) => {
  dispatch({ type: CLEAN_DETAIL });
};

export const changeStatus = (payload, status) => async (dispatch) => {
  const online = await axios.put("http://localhost:3001/users/" + payload, {
    isOnline: status,
  });
};

export function addFavorite(userID, idWorkerFav) {
  return async function (dispatch) {
    await axios.put("http://localhost:3001/users/" + userID, {
      favorites: idWorkerFav,
    });
    dispatch({
      type: ADD_FAVORITE,
      payload: idWorkerFav,
    });
  };
}
export function deletedFavorite(userID, workDeleted) {
  return async function (dispatch) {
    await axios.put("http://localhost:3001/users/" + userID, {
      deleted: workDeleted,
    });
    dispatch({
      type: DELETED_FAVORITE,
      payload: workDeleted,
    });
  };
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

export function postCountry(obj) {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/countries", obj);
      dispatch({ type: POST_COUNTRY });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postJob(obj) {
  return async function (dispatch) {
    try {
      await axios.post("http://localhost:3001/jobs", obj);
      dispatch({ type: POST_JOB });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteUser(id, deleted) {
  return async function (dispatch) {
    try {
      await axios.delete(
        `http://localhost:3001/users/${id}?deleted=${deleted}`,
        deleted
      );
      dispatch({ type: DELETE_USER });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteJob(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/jobs/${id}`);
      dispatch({ type: DELETE_JOB });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteCountry(id) {
  return async function (dispatch) {
    try {
      await axios.delete(`http://localhost:3001/countries/${id}`);
      dispatch({ type: DELETE_COUNTRY });
    } catch (error) {
      console.log(error);
    }
  };
}
