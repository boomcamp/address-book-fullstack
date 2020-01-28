const express = require('express');
const massive = require('massive');
const users = require('./controllers/user');
const contacts = require('./controllers/contacts');
const groups = require('./controllers/groups');
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

    //Register //ok
    app.post('/api/signup', users.signup);
    //Sign-in //ok
    app.post('/api/login', users.login);
    //get user details //ok
    app.get('/api/user/:id', users.getUser);
    //list all contacts //ok
    app.get('/api/contacts/:userID/:order', contacts.listContacts);
    //create contact //ok
    app.post('/api/contact/:userID', contacts.addContact);
    //update contact //ok
    app.patch('/api/contact/:id', contacts.updateContact);
    //delete contact //ok
    app.delete('/api/contact/:id', contacts.deleteContact);
    //list all contacts not in group //ok
    app.get('/api/:userID/group/:id/not_in_group', groups.listContactsNotInGroup);
    //list all contacts in group //ok
    app.get('/api/group/:id/contacts', groups.listContacts);
    //list all groups //ok
    app.get('/api/groups/:userID/:order', groups.listGroups);
    //add group //ok
    app.post('/api/group/:userID', groups.addGroup);
    //edit group //ok
    app.patch('/api/group/:id', groups.editGroup);
    //delete group //ok
    app.delete('/api/group/:id', groups.deleteGroup);
    //add members to group
    app.post('/api/group/:id/add', groups.addMembers);
    //delete member group //ok
    app.delete('/api/group/:id/:groupMemberID', groups.deleteMember);

    const port = 3002;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })

  })