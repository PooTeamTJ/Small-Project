// We are going to bring in Mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
    We need the Schema I dont know what a 
    Schema is :(
    
    I think we are creating fields in our database
    Since Mongoose is non relational database
    we are creating a set of fields to hold
    our date
*/
// Create Schema
const ItemSchema = new Schema(
    {
       Firstname: 
       {
           type: String,
           required: true
       },
       Lastname:
       {
           type: String,
           required: true
       },
       PhoneNumber:
       {
           type: Number,
           required: true
       },
       Email:
       {
           type: String,
           required: false
       },
       date:
       {
           type: Date,
           required: false
       }
    }
);
/*
    In our Schema we created
    1. Firstnmae
    2.Lastname
    3.Email
    4. Date
*/

module.exports = Item = mongoose.model('item', ItemSchema);
/*
    We are going to export this model so that we can
    use it in other files
*/

