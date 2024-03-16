// reducers.js
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/authActions';

const initialState = {
  isLoggedIn: false,
  username: '',
  loading: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        loading: false,
        username: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn:false,
        loading: false
      };
    default:
      return state;
  }
};

export default authReducer;
