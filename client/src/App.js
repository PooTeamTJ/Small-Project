/*
  THis is starting point of our client side
  this is where we start running the app 
  and what ever we have done in the other 
  files will meet here. 
*/

// New stuff "React-Router-Dom"
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import NotFoundPage from "./pages/404"
import LoginPage from "./pages/login"
import ContactPage from "./pages/contact"
import RegisterPage from "./pages/register"

// Imports

import React, { Component} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import {loadUser} from './actions/authActions';
import store from './store';



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

  render() {
    return (
      <Provider store = {store}> 
      <Router>
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/404" component={NotFoundPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Redirect to="/404" />
        </Switch>
      </Router>
     </Provider>
      

      // 
      //   <div className="App">
      //       <AppNavbar/>
      //       <Container>
      //           <ItemModel/>
      //           <SearchList/>
      //           <Contactlist />
      //       </Container>
      //   </div>
      // 
    )
  }
}

export default App;
