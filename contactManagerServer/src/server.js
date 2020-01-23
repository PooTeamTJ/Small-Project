/*
File to start the server. needs npm express

Itzik (Zeke) Efraim
*/

// server
const express = require('express')
// makes sure the file runs and connect to db
require('./db/mongoose')
const userRouter = require('./routes/api/user')
const taskRouter = require('./routes/api/contact')

// creates the server
const app = express()
// gets the port from horaku or 5000 (switched port to 5000 from 3000 because client 'app' is using 3000)
const port = process.env.PORT || 5000

// middleware function that translates the objects to json file
app.use(express.json())
// gets the end points from the user and contact file
app.use(userRouter)
app.use(taskRouter)

// starts server
app.listen(port, () => {
  console.log('Server is up on port ' + port)
})
