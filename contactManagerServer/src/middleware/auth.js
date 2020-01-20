const jwt = require('jsonwebtoken')
const User = require('../models_Data/user')

const auth = async (req, res, next) => {
  try {
    // gets the token from the header we set up in postman
    const token = req.header('Authorization').replace('Bearer', '').trim()
    // verify the token is valid
    const decoded = jwt.verify(token, 'thisismynewcourse')
    // finds a user with that id who has this token stored
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
     // if user wasn't found
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()

  } catch(err) {
    res.status(401).send({error: 'Please authenticate'})
  }

}

module.exports = auth
