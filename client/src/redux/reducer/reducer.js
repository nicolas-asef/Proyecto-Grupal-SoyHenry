import { GET_JOBS } from "../actions/actions";

const initialState = {
  workers: [],
  jobs: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_JOBS: 
      return{
        ...state,
        jobs : action.payload
    }
    default:
      return state;
  }
}

export default reducer;