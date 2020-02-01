/**
All the contact endpoints are in this class.
To run it we to npm install express, and require auth and Contact.

These are the endpoints for the contact objest:
delete a contact by id,
get one by id,
get all contacts of a user,
update a contact by id

Itzik (Zeke) Efraim
**/

const express = require('express')
const router = new express.Router()
const auth = require('../../middleware/auth')
const Contact = require('../../models_Data/contact')



// delete by id
router.delete('/contact/:id', auth, async (req, res) => {
  try {
    // finds a contact that is owned by the requster and deletes it
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    // if contact doesnt exit
    if (!contact) {
      return res.status(404).send()
    }

    res.send(contact)
  } catch (err) {
    res.status(500).send(err)
  }

})

// create a contact
router.post('/contact', auth, async (req, res) => {
const contact = new Contact({
  // copies all req.body properties to the new contact object
  ...req.body,
  // creates the relation between the task and the owner
  owner: req.user._id
})

  try {
    // saves contact in db
    await contact.save()
    res.status(201).send(contact)
  } catch(err) {
    res.status(400).send(err)
  }
})

// get a contact by id
router.get('/contact/:id', auth, async (req, res) => {
  // gets the id we need from the request
  const _id = req.params.id

  try {
    // making sure the user can only get it's own contacts
    const contact = await Contact.findOne({ _id, owner: req.user._id })
    // if contact doesnt exist
    if (!contact) {
      return res.status(404).send()
    }
    res.send(contact)

  } catch(err) {
    res.status(500).send()

  }
})

// returns all contacts that belongs to the user
// to serach the url should be /contact?name=itzik
// /contact?sortBy=name:asc // sort result in ascending. if want by descending replace asc with desc
// /tasks?limit=10&skip=0 // return 10 results in first page. skip=1 will go to second page and so on
router.get('/contact', auth, async (req, res) => {
  // object to use in the filter populate.
  const match = {}
  // if the url string contains name it will add it to match.
  if (req.query.Firstname) {
    // search people that start with a given string or match
    match.Firstname = {'$regex': req.query.Firstname}
  }

  // sorting object
  const sort = {}
  // if url has sortBy
  if (req.query.sortBy) {
    // splits the url to 2 parts, before and after : we can also use _ instead of
    const parts = req.query.sortBy.split(":")
    // takes the first part (field that we want to sort by) of url and adds it as a field to object sort,
    // then setting its value to either 1 ascending or -1 descending
    sort[parts[0]] =  parts[1] === 'desc' ? -1 : 1
  }

  try {
    // only returns contacts that belongs to that user
    // has an option to filter the data and pagination (divide pages with max results and page number)  and sort it
    await req.user.populate({
      path: 'contact',
      match,

      options: {
        // max results in a page
        limit: parseInt(req.query.limit),
        // what page you want to be in
        skip: parseInt(req.query.skip),
        // takes sort object from above
        sort
      }
    }).execPopulate()
    res.send(req.user.contact)
  } catch (err) {
      req.status(500).send(err)
  }
})




// // returns all contacts that belongs to the user
// router.get('/contact', auth, async (req, res) => {
//   try {
//     // only returns tasks that belongs to that user
//     await req.user.populate('contact').execPopulate()
//      res.send(req.user.contact)
//   } catch (err) {
//       req.status(500).send(err)
//   }
// })


// update contact by id
router.patch('/contact/:id', auth, async (req, res) => {
  // gets all the updates requested
  const updates = Object.keys(req.body)
  // these are the fields that are allowed to be updated
   const allowedUpdates = ['Firstname', 'Lastname', 'PhoneNumber', 'Email', 'DOB']
  // // making sure the request is valid
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

   if (!isValidOperation) {
     return res.status(400).send({error: 'Invalid updates'})
   }

  try {
    // finds the contact in the db and makes sure it is owned by the requester
    const contact = await Contact.findOne({_id: req.params.id, owner: req.user._id })

    if (!contact) {
      return res.status(404).send()
    }

    // goes through all the updates the user wishes to make and make them
    updates.forEach((update) => contact[update] = req.body[update])
    // uploads changes
    await contact.save()

    res.send(contact)
  } catch (err) {
    res.status(400).send(err)

  }
})

module.exports = router
