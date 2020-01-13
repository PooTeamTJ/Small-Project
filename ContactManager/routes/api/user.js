const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')

/**
These are the endpoints for the user objest:
get all
get one by id
remove one by id
update one by id
post a new user
login

**/

router.post('/users/login', async (req, res) => {
  try {
    // a function we made in user.js in models files
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    // if user was found send it
    res.send({ user, token })
  } catch (err) {
    res.status(400).send()
  }
})

// connects to the file users in atlas (we connected to atlas through mongoose.js)
// adds information to db
// an endpoint to create a new user
router.post('/users', async (req, res) => {
 const user = new User(req.body) // gets the pbject from the user and save it

 //sends back the user created and change status to Created
 try {
   // saves user in database
   await user.save()
   const token = user.generateAuthToken()
   res.status(201).send({user, token})
 // sends the error and shows the error code
 } catch (err) {
   res.status(400).send(err)
 }
})

// logout only from one session
router.post('/users/logout', auth, async (req, res) => {

  try {
    // goes through the user's token array and it finds the token provided it
    // deletes it. that way the user doesn't have access anymore, therefor loggedout
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    // save changes
    await req.user.save()

    res.send()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})

// logout all
router.post('/users/logoutAll', auth, async (req, res) => {

  try {
    // empty out the tokens array
    req.user.tokens = []
    // save changes
    await req.user.save()

    res.send()
  } catch (err) {
    console.log(err)
    res.status(500).send()
  }
})


// reads data from the db
router.get('/users/me', auth, async (req, res) => {
  res.send(req.user) // user get its own data
})



router.delete('/users/me', auth, async (req, res) => {
  try {
     // req.user is being passed in middleware
     // remove() removes the user from the database
    await req.user.remove()
    res.send(req.user)
  } catch(err){
      res.status(500).send(err)
  }
})


// update a use by id
router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates'})
  }


  try {
    updates.forEach((update) => req.user[update] = req.body[update]) // goes through all the updates the user wishes to make
    await req.user.save() // uploads changes

    res.send(req.user)
  } catch(err) {
    res.status(400).send(err)
  }
})

module.exports = router
