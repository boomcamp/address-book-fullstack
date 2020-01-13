const express = require('express');
const massive = require('massive');
const cors = require('cors')

const user = require('./controllers/users');

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
        app.get('/api/users', user.getAllData);
        // Fetch by user ID
        app.get('/api/users/:id', user.getDataById);

        // Edit user
        app.patch('/api/users/:id', user.updateUser);

        // Delete user
        app.delete('/api/users/:id', user.deleteUser);

        const port = 3001;
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })  