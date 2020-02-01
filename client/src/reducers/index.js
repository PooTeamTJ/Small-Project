// For now will only have item reducer
//But in future we might want to have a 
// auth redcer.
// THis is like a meeting point for all reducers

import {combineReducers} from 'redux';

import itemReducer from './itemReducer';
import errorReducers from './errorReducers';
import authReducer from './authReducer';


export default combineReducers(
    {
        item: itemReducer,
        error: errorReducers,
        auth: authReducer
    }
);