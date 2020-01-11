// in our server.js we need
// express, Mongoose, bodyparser

const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

/*
    In order for the api routes to acutally
    work we need to do something
*/

const items = require('./routes/api/items')

//Intialize express into an variable
const app = express();

//BodyParser Middleware
// I think the body parser actually translates
// the json script into understandable
app.use(bodyparser.json());

// We want to bring our URI in here and put it in a variable
const db = require('./config/keys').mongoURI;

// Connect to MongoDB our database
// THis is promise base I dont know what that means
mongoose
/*
    line1. Get connected
    line2. if you get connected prompt that you are connectd
    line3. if you are not connected throw an error
*/

    .connect(db)
    .then(() => console.log('Our Database is Now connected....'))
    .catch(err => console.log(err));

// Now since we are connected to our server we need to run it
const port = process.env.PORT || 5000;
/*
    process.env.PORT is an envoriment variable
    I dont know what that means
*/

// Use the Routes
app.use('/api/items', items);
/*
    Anything that goes through api
    route should refer to the items
    variable
*/

app.listen(port, () => console.log(`Server has started on port ${port}`));

/*
    We want to listen to what our port has returned and display it on
    the log.
*/
