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
        app.post('/api/register', user.newUser);

        // Login User
        app.post('/api/login', login.login)
        // app.get('/get/test', (req, res) => {
        //     res.status(200).json({ 'name': 'psst' })
        // })
        const port = 3001;
        app.listen(port, () => {
            console.log(`Listening on port ${port}`);
        })
    })  