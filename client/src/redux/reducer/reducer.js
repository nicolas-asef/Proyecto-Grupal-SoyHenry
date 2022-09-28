import {GET_USERS, GET_USERNAME, POST_USER} from "../actions"



const initialState = {
  workers: [],
  users: [],
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_USERS:
        return {
          ...state,            
          users: action.payload            
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
    default:
      return state;
  }
}

export default reducer;