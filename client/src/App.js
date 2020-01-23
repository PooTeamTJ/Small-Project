import React, { Component } from 'react'

//import AppNavbar from './components/AppNavbar' (Might delete this)

// import logo from './logo.svg'; (Delete this)
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

// react-router-dom allows you to create a multi-page app
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from "react-router-dom"

//  Must have this to import multiple Pages
import TempPage from "./pages/temp"
import NotFoundPage from "./pages/404"
import LoginPage from "./pages/login"
import ContactPage from "./pages/contact"
import RegisterPage from "./pages/register"

// import { render } from 'react-dom';

class App extends Component {

    render() {
      return (
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
      )    
    }
}

export default App
