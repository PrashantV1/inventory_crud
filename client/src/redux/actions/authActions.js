// actions.js
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST
});

export const loginSuccess = (username) => ({
  type: LOGIN_SUCCESS,
  payload: username
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE
});
