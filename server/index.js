const express = require('express');
const massive = require('massive');
var cors = require('cors')
const users = require('./controllers/users');

massive({ 
    host: 'localhost',
    port: 5434,
    database: 'addressbook',
    user: 'postgres',
    password: 'addressBook',
}).then(db => {
    const app = express();
    app.set('db', db)
    app.use(express.json())
    app.use(cors())

    app.post('/api/signup', users.register)
    app.post('/api/login', users.login)


    const PORT = 3007
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`) );
})