// export const action = () => async (dispatch) => {}
import axios from "axios";
export const GET_JOBS = "GET_JOBS";
export const GET_USERS = "GET_USERS";
export const GET_USERNAME = "GET_USERNAME";
export const POST_USER = "POST_USER";

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
  // seguramente el nombre del endpoint worker y los nombres de la data que manda haya que modificarla
  return async function (dispatch) {
    const user = await axios.post("http://localhost:3001/users", payload);
    const user_id = await user.data.ID;
    if(payload.work) {
      const worker = {
        user_id,
        jobs: payload.work,
        certificate: payload.certificate

      }
      const res = await axios.post("http://localhost:3001/workers", worker);
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
