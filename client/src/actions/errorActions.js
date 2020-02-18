import { GET_ERRORS, CLEAR_ERRORS, REGISTER_SUCCESS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    }
}

// RETURN SUCCESS
export const returnSuccess = (msg, status, id = null) => {
    return {
        type: REGISTER_SUCCESS,
        payload: {msg, status, id}
    }
}

// CLEAR ERRORS

export const clearErrors = () =>{
    return{
        type: CLEAR_ERRORS
    }
}