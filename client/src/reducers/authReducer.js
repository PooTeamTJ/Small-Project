/*
    THis where we change our states according the actions we have performed
*/

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "../actions/types";
// Imports
const intialState = {
    token: localStorage.getItem('token'), // Getting the token form localstorage.
    isAuthenticated: null, // changed that
    isLoading: false,
    user: null,
<<<<<<< HEAD
    msg: {}
=======
    showSuccess: false
>>>>>>> 1bf2902b6ecc4609123f199a11065ca50206c763
}

export default function(state = intialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false

            };
            case REGISTER_SUCCESS:
                return {
<<<<<<< HEAD
                    msg: action.payload.msg
                   
=======
                    ...state,
                token: null,
                user: null,
                isAuthenticated: false, // changed that
                isLoading: false,
                showSuccess: true,
                msg: action.payload.msg
>>>>>>> 1bf2902b6ecc4609123f199a11065ca50206c763
                }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                isAuthenticated: false, // changed that
                isLoading: false,
                showSuccess:false
            }
        default:
            return state;


    }
}
