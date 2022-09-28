import axios from "axios"

export const GET_JOBS = "GET_JOBS"

export function getJobs (){
    return async function (dispatch){
        try {
            let jobs = await axios.get("http://localhost:3001/jobs")
            return dispatch ({type: GET_JOBS, payload: jobs.data})
        } catch (error) {
            console.log(error)
        }
    }
}