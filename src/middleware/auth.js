const jwt = require('jsonwebtoken')
const User = require('../models_Data/user')
// const config = require('config');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim() // gets the token from the header we set up in postman
    const decoded = jwt.verify(token, 'thisismynewcourse') // verify the token is valid
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // finds a user with that id who has this token stored
     // if user wasn't found
    if (!user) {
      throw new Error()
    } 
    req.token = token
    req.user = user
    next()

  } catch(err) {
    return res.status(401).send({msg: 'Please authenticate'})
  }

}

module.exports = auth;
