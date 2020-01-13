const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const Contact = require('../../models_Data/contact')

/**
These are the endpoints for the contact objest:
get all
get one by id
remove one by id
update one by id
post a new user

**/


router.delete('/contact/:id', auth, async (req, res) => {
  try {
    // finds a task that is owned by the requster and deletes it
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if (!contact) {
      return res.status(404).send()
    }

    res.send(contact)
  } catch (err) {
    res.status(500).send(err)

  }

})

router.post('/contact', auth, async (req, res) => {
const contact = new Contact({
  ...req.body, // copies all req.body properties to task object
  owner: req.user._id // creates the relations between the task and the owner
})

  try {
    await contact.save()
    res.status(201).send(contact)
  } catch(err) {
    res.status(400).send(error)
  }
})

router.get('/contact/:id', auth, async (req, res) => {
  const _id = req.params.id // fetches the id we need

  try {
    const contact = await Contact.findOne({ _id, owner: req.user._id }) // making sure the user can only get it's own tasks

    if (!contact) {
      return res.status(404).send()
    }
    res.send(contact)

  } catch(err) {
    res.status(500).send()

  }
})

router.get('/contact', auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id}) // only returns tasks that belongs to that user
    await req.user.populate('contact').execPopulate() // does the same as line commented above
    res.send(req.user.contact)
  } catch (err) {
      req.status(500).send(err)
  }
})



router.patch('/contact/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({error: 'Invalid updates'})
  }

  try {
    const contact = await Contact.findOne({_id: req.params.id, owner: req.user._id })// finds the contact in the db and makes it is owned by the requester



    if (!contact) {
      return res.status(404).send()
    }

    updates.forEach((update) => contact[update] = req.body[update]) // goes through all the updates the user wishes to make
    await contact.save() // uploads changes

    res.send(contact)
  } catch (err) {
    res.status(400).send(err)

  }
})

module.exports = router
