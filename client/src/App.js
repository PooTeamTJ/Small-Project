/*
  THis is starting point of our client side
  this is where we start running the app 
  and what ever we have done in the other 
  files will meet here. 
*/

// Imports

import React, { Component} from 'react';

import AppNavbar from './components/AppNavbar'

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Contactlist from './components/Contactlist';
import ItemModel from './components/ItemModel';
import { Container } from 'reactstrap';
import SearchList from './components/SearchList';
import {loadUser} from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';
import {getItems} from './actions/itemActions';
import {Button} from 'reactstrap';



class App extends Component {

  /*
    componentDidMount is an inbuilt life cycle 
    function in react.
    What this is doing?
      It is making sure that when we reload 
      we wont get logged out, lose our token and
      the loaded contacts.
  */
  componentDidMount(){
    store.dispatch(loadUser()); // Load user comes from authactions
    // store.dispatch(getItems()); // getItems comes from itemActions
  }

  render()
  {

  return (
    // for details on store check store.js
    <Provider store = {store}> 
    <div className="App">
      <AppNavbar/>
      <Container>
      <ItemModel/>
      <SearchList/>
      <Contactlist />
      </Container>
    </div>
    </Provider>
  );
 }
}

export default App;