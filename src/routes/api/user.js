/**
All the users endpoints are in this class.
To run it we to npm install express, and require auth and User.

These are the endpoints for the user objest:

login
logout from one session
logout all sessions
get your own information
delete your user
update user

Itzik Zeke Efraim
**/

const express = require('express')
const router = new express.Router()
const User = require('../../models_Data/user')
const auth = require('../../middleware/auth')

// login
router.post('/users/login', async (req, res) => {
  try {
    // a function we made in user.js in models files
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    if (!user) return res.status(400).json({ msg: 'Invalid credentials or user does not exist'});

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
  // gets the object from the user and save it
 const user = new User(req.body)

 //sends back the user created and change status to Created
 try {
   // saves user in database
   await user.save()
   const token = user.generateAuthToken()
   return res.status(201).send({user, token})
 // sends the error and shows the error code
 } catch (err) {
   return res.status(400).send(err)
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


// get your own information
router.get('/users/me', auth, async (req, res) => {
  // user get its own data
  res.send(req.user)
})


// delete your user
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


// update user
router.patch('/users/me', auth, async (req, res) => {
  // gets all the updates requested
  const updates = Object.keys(req.body)
  // make sure the request is valid
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates'})
  }

  try {
    // goes through all the updates the user wishes to make
    updates.forEach((update) => req.user[update] = req.body[update])
    // uploads changes
    await req.user.save()

    res.send(req.user)
  } catch(err) {
    res.status(400).send(err)
  }
})

router.get('/userid', auth, (res, req) => {
  User.findById(req.User.owner)
    .select('-password')
    .then(User => req.json(User));
});
module.exports = router;
