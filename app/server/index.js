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

        // Sign up
        app.post('/api/register', user.newUser);
        // Login User
        app.post('/api/login', user.login);


        // Fetch all users
        app.get('/api/contacts', contact.getAllData);
        // Fetch by user ID
        app.get('/api/contacts/:contact_id', contact.getDataById);
        // Search user
        app.get('/api/contacts', contact.searchUser);
        // Edit user
        app.patch('/api/contacts/:contact_id', contact.updateUser);
        // Delete user
        app.delete('/api/contacts/:contact_id', contact.deleteUser);
        // Add user
        app.post('/api/contacts/:user_id', contact.addUser);

        const port = 3001;
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })  