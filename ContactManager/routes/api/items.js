//Bringiing in the express router
const express = require('express');
const router = express.Router();
/*
    Bringing the Item Model we need that to
    make querry and to find items stuff like that
*/

//test 
const Item = require('../../models_Data/Item');

/*
    @route GET api/items
    Description: Gets all the items
    Access: The access is public for now
            because we havent set any
            authorization yet I dont
            know if we need to
*/

router.get('/',(req, res) =>
{
    Item.find()
    .sort({Firstname: 1})
    .then(items => res.json(items))
});

/*
    @route Post api/items
    Description: Creates a item
    Access: The access is public for now
            because we havent set any
            authorization yet I dont
            know if we need to
    --> Normally this would be private
*/

router.post('/',(req, res) =>
{
   const newItem = new Item(
       {
           Firstname: req.body.Firstname,
           Lastname: req.body.Lastname,
           PhoneNumber: req.body.Number
       }
   );
   newItem.save().then(item=> res.json(item))
});
/*
    @Route Delete api/items/id
    Description: We find the created item by id and then delete it
*/
router.delete('/:id',(req, res) =>
{
   const newItem = new Item(
  Item.findById(req.params.id)
  .then(item => item.remove()
  .then(() => res.json({success: true})))
   .catch(err => res.status(404).json({success: false})));
});


/*
    '/' The slash actually represents api/items
    we are going to fetch all the items and then
    sort them according to the firstname
    ---Lets hope this works---
*/

module.exports = router;

/*
    We need this default router or
    else nothing will work
*/

/*
    TO test our API we need an HTTP Client
    now we need
    POstman or Swagger, etc

    -- I tested this on PostMan but we can
        get started with Swagger---

    Make sure your database is runnin*
*/
