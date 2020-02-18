/*
    THis is where we make our request to backend
    to add contacts delete contacts
    THis where we have to make the update request in  the future
    using .patch
*/
import {GET_ITEMS, ADD_ITEM, DELETE_ITEM, SEARCH_ITEM, ITEMS_LOADING} from './types';
import axios from 'axios';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

/*
    Get all the contacts that match the owner id in
    the backend
*/

export const getItems = () => (dispatch, getState) =>
{
    dispatch(setItemsLoading());
    axios
        .get('/contact', tokenConfig(getState))
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const searchItem = (item) => (dispatch, getState) =>
{
    dispatch(setItemsLoading());
    axios
        .get(`/contact?Firstname=${item.Firstname}`, tokenConfig(getState))
        .then(res => dispatch({
            type: SEARCH_ITEM,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addItem = item => (dispatch, getState)  => { // Add a contact to the backend
  axios
    .post('/contact',item, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_ITEM,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

};

export const updateItem = (item, id) => (dispatch, getState)  => { // Update a contact to the backend
    axios
      .patch(`/contact/${id}`,item, tokenConfig(getState))
    //   .then(res => dispatch({

        //   type: UPDATE_ITEM
    //     //   payload: id
    //   }))
      .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

  };

export const deleteItem = id => (dispatch, getState) => { // Delete the conatact
  if (window.confirm('Are you sure you want to delete?')){
   axios.delete(`/contact/${id}`, tokenConfig(getState))
   .then(res =>
    dispatch({
        type: DELETE_ITEM,
        payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
  }

};

/*
    Search items we dont actually make a http request it is
    just  I wasnot able to do it the components
    so i just did it in reduces by sending through here
*/



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
};