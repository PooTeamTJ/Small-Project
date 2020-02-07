/*
  THis is starting point of our client side
  this is where we start running the app 
  and what ever we have done in the other 
  files will meet here. 
*/

// New stuff "React-Router-Dom"
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom"

import TempPage from "./pages/temp"
import NotFoundPage from "./pages/404"
import LoginPage from "./pages/login"
import ContactPage from "./pages/contact"
import RegisterPage from "./pages/register"

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
    // Router Stuff
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/404" component={NotFoundPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/temp" component={TempPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Redirect to="/404" />
      </Switch>
    </Router>

    // for details on store check store.js
    // <Provider store = {store}> 
    // <div className="App">
    //   <AppNavbar/>
    //   <Container>
    //   <ItemModel/>
    //   <SearchList/>
    //   <Contactlist />
    //   </Container>
    // </div>
    // </Provider>
  );
 }
}

export default App;