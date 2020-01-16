const express = require('express');
const massive = require('massive');
const users = require('./controllers/user');
const contacts = require('./controllers/contacts');
const cors =require('cors')


massive({
  host: 'localhost',
  port: 5432,
  database: 'addressbook',
  user: 'postgres',
  password: '1234'
})
  .then(db => {
    const app = express();  
    app.use(cors())
    app.set('db', db);
    app.use(express.json());

    //Register
    app.post('/api/signup', users.signup);
    //Sign-in
    app.post('/api/login', users.login);
    //get user details
    app.get('/api/user/:id', users.getUser);
    //list all contacts 
    app.get('/api/contacts/:userID/:order', contacts.listContacts);
    //create contact
    app.post('/api/contact/:userID', contacts.addContact);
    //update contact
    app.patch('/api/contact/:id', contacts.updateContact);
    //delete contact 
    app.delete('/api/contact/:id', contacts.deleteContact);

    const port = 3002;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })

  })