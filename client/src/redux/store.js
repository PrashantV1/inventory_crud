


import authReducer from './reducers/authReducers';

import { combineReducers, configureStore } from "@reduxjs/toolkit";


const rootreducer=combineReducers({auth:authReducer})
const store=configureStore({reducer:rootreducer})
export default store;