To use this file you have to run to intall the required packages--> npm install mongoose jsonwebtoken validator bcryptjs express

This folder includes the server as well as the database. I connected them together and created a few endpoints for different actions.

I tested all the endpoints using postman and Mongodb Atlas.

The file you need to run is server.js

Database: 

  User object with the following fields:
  
    name, (required)
    
    password, (required)
    
    email, (required)
    
    age
    
  Contact object with the following fields:
  
    name, (required)
    
    phonenumber, (required)
    
    email, (required)
    
    birthday
    
Relation between User and Contact:

Every Contact instance has a user instance as an owner

Itzik (ZeKe) Efraim
