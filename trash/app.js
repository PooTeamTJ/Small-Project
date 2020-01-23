
import React from 'react'
import ReactDOM from 'react-dom'
import '../util/css/auth.css'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// Components
import App from './components/app'
import Login from './components/loginPage' // Needs to be changed to login
import Register from './components/register'

ReactDOM.render(

	<Router>
	  <App>
		  <Route exact path='/' component={Home}/>
		  <Route exact path='/current-weather' component={CurrentWeather}/>
		  <Route exact path='/error' component={ErrorDisplay}/>
	  </App>
	</Router>

,document.getElementById('root'))

registerServiceWorker()