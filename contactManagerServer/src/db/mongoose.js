/*
File to connect to database.

Itzik (Zeke) Efraim
*/
const mongoose = require('mongoose')

const connectionURL = 'mongodb+srv://itzik:Itzik170295@cluster0-gs5dc.mongodb.net/ContactManagerApp?retryWrites=true&w=majority'   

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).catch((error) => {
  console.log(error)
})
