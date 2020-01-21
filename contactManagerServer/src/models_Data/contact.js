/*
This is the contact schema. To use it we need to install mongoose and validator.
In the schema we make the conncetion between the contact and it owner.
Contact will have:
name, phone number, email, birthday, and owner for now. feel free to add more fields.
Itzik (Zeke) Efraim
*/
const mongoose = require('mongoose')
const validator = require('validator')



const Contact = mongoose.model('Contact', {
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 30
  },
  phoneNumber: {
    type: String,
    trim: true,
    required: true,
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error('Phone is not valid')
      }
    }
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is not valid')
      }
    }
  },
  birthday: {
    type: String,
    required: false
  //  format: date
  },
  // this is to make the connection between the user and its contacts
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    // should be typed exactly like in the mongoose.model in the user model
    ref: 'User'
  }
})

module.exports = Contact
