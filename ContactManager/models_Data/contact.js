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
    unique: true,
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
    required: false,
    format: date

  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // should be typed exactly like in the mongoose.model in the user model
  }
})

module.exports = Contact
