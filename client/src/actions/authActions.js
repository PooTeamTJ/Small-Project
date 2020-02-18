/*
    Authorized actions this where we make our hhtp
    requests thorough axios
*/

import axios from 'axios';
import { returnErrors, returnSuccess } from './errorActions';

import{
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({type: USER_LOADING});
    axios.get('/users/me', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR

            })
        });
}
// register User

// Getting our contacts

export const register = ({ name, email, password, age}) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
         }
    }
      //  Request body
      const body = JSON.stringify({ name, email, password, age});

      axios.post('/users', body, config) //making Add user request.
        .then(res => {
            dispatch({ 
            type: REGISTER_SUCCESS,
            payload:res.data
             })
             
         })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}
// Login User
export const login = ({email, password}) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"

        }
    }
      //  Request body
      const body = JSON.stringify({email, password});

      axios.post('/users/login', body, config) // Login request
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload:res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}

// Logout User

export const logout = () => {
    return{
        type: LOGOUT_SUCCESS
    };
};
// Setup config/headers and token
export const tokenConfig = getState => {
/*
    We get the token from our localstorage
*/

const token = getState().auth.token;

// Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }

    }

//  if it is a token then add to headers
if(token){
    config.headers['Authorization'] = token; // Authorization is the name we gave it in the backend middleware/auth.js
    }

    return config;
}
