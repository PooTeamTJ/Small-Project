/*
    A store holds the whole state tree of your application.
    The only way to change the state inside it is to dispatch an
    action on it.

    A store is not a class.
    It's just an object with a few methods on it.
    To create it, pass your root reducing function to
    createStore.

*/

/*

    createStore:
    applyMiddleware: because we are going to be using thunx
                    We need this to wrap the middleware
    Compose: we wrap the middle ware into compose
*/

import {createStore, applyMiddleware, compose} from'redux';

import thunk from 'redux-thunk';
import rootReducer from'./reducers/index';


const initialState = {}; // Our Intial state
/*

    What ever middleware we are going to use we are going to put it
    in here in this case we are using thunk
*/

const middleware = [thunk];


const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),

    ((window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) // We need this for the redux to work
    || (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose))

));

export default store;
