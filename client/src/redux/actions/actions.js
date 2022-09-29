// export const action = () => async (dispatch) => {}
import axios from "axios";
import { GET_JOBS, GET_USERS, GET_USERNAME, POST_USER, GET_WORKERS_PREMIUM } from './actions_vars'


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

