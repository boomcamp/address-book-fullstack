const express = require('express');
const massive = require('massive');
const cors = require('cors');

const user = require('./controllers/users');
const contact = require('./controllers/contact');

massive({
    host: 'localhost',
    port: 5432,
    database: 'bookdb',
    user: 'postgres',
    password: 'book'
})
    .then(db => {
        const app = express();
        app.set('db', db);
        app.use(cors())
        app.use(express.json());

        // USERS
        // Sign up
        app.post('/api/register', user.newUser);
        // Login User
        app.post('/api/login', user.login);
        // Fetch by ID
        app.get('/api/users/:user_id', user.getUsersByID);
        // Edit user profile
        app.patch('/api/users/:user_id', user.updateUser);
        // Delete user
        app.delete('/api/users/:user_id', user.deleteUser);


        // CONTACT
        // Add contact
        app.post('/api/contacts/:user_id', contact.addContact);
        // Fetch all contact
        app.get('/api/contacts/:user_id/contacts', contact.getUserContacts);
        // Fetch contact by ID
        app.get('/api/contacts/:contact_id', contact.getContactByID)
        // Edit contact
        app.patch('/api/contacts/:contact_id', contact.updateContact);
        // Delete contact
        app.delete('/api/contacts/:contact_id', contact.deleteContact);
        // Sort contact
        app.get('/api/contacts/:user_id/contact/fa-z', contact.contactFnameAsc);
        app.get('/api/contacts/:user_id/contact/fz-a', contact.contactFnameDesc);
        app.get('/api/contacts/:user_id/contact/la-z', contact.contactLnameAsc);
        app.get('/api/contacts/:user_id/contact/lz-a', contact.contactLnameDesc);

        const port = 3001;
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })  