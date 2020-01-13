/*
This is the user schema. To run it we need to npm install mongoose, validator, bcryptjs, jsonwebtoken,
and get the contact schema. The user has the following fields:
name, password, email, age, and token.
Also included are the following methods:
virtual - make a connection with the contact, findByCredentials - static method to login with password and email,
generateToken - create a unique token for the user, toJSON - to hide uneccessery information of the user,
and a couple middleware function to perform actions before saving to db.

Itzik (Zeke) Efraim
*/

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Contact = require('./Contact')


// user blue print
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 20,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 35,
    validate(value) {
      if (value.includes('password')) {
        throw new Error('password is not allowed to be included in your password')
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
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})



// virtual property (realationship)
userSchema.virtual('contact',{
  ref: 'Contact',
  // the user's _id is the relationship between the user and the contact
  localField: '_id',
  // name of the field on the contact that creates the relationship. we called it owner in the contact models
  foreignField: 'owner'
})

// middleware function
// statics is for letting us access this function from other files
userSchema.statics.findByCredentials = async (email, password) => {
  // looking for the user by email
  const user = await User.findOne({ email })

  // if user wasnt found throw an error
  if (!user) {
    throw new Error('Unable to login')
  }

  // if user was found, checks if password provided is the same password that
  // is in our database
  const isMatch = await bcrypt.compare(password, user.password)

  // if password doesnt match throw an error
  if (!isMatch) {
    throw new Error('Unable to login')
  }

  // if everything mathces returns user
  return user
}


// generate token so users can stay logged in and perform actions
userSchema.methods.generateAuthToken = async function () {
  const user = this
  // generates token
  const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

  // connect token to the use instance
  user.tokens = user.tokens.concat({ token })
  // uploads to the databse
  await user.save()

  return token
}

// a function to return a user object without details that should be safe
// every time we send a user object back in the routers this function is being called
userSchema.methods.toJSON =  function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// a middleware function to perform things right after the user was created
// and right before the use is getting saved in the db
userSchema.pre('save', async function (next) {
  const user = this

  // hashing the password and changing the password value for user
  // if password hasn't been hashed before (in case of an update request the user makes)
  if (user.isModified('password')) {
    // 8 stands for how many rounds of hashing
    user.password = await bcrypt.hash(user.password, 8)
  }
  // when we are done with middleware
  next()
})

// a middleware for deleting your own account.
// right before it gets deleted, this function deletes all
// it's contact from the database
userSchema.pre('remove', async function (next) {
  const user = this
  // this needs to be changed
  await Contact.deleteMany({ owner: user._id })

  next()
})

// creates the model 
const User = mongoose.model('User', userSchema)

module.exports = User
