const express = require('express');
const massive = require('massive');

const user = require('./controllers/users');
const login = require('./controllers/login');

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
        app.use(express.json());

        // New User
        app.post('/api/register', user.register);

        // Login User
        app.post('/api/login', login.login)

        const port = 4000;
        app.listen('port', () => {
            console.log(`Listening on port ${port}`);
        })
    })