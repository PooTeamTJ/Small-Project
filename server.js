/*
File to start the server. needs npm express

Itzik (Zeke) Efraim
*/

// server
const express = require('express')
// makes sure the file runs and connect to db
require('./src/db/mongoose')
const userRouter = require('./src/routes/api/user')
const taskRouter = require('./src/routes/api/contact')
const path = require('path');

// creates the server
const app = express()
// gets the port from horaku or 3000
const port = process.env.PORT || 5000

// middleware function that translates the objects to json file
app.use(express.json())
// gets the end points from the user and contact file
app.use(userRouter)
app.use(taskRouter)

// NODE_ENV is set to production by default from heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // if we're not at the / route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

// starts server
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
