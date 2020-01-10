const express = require('express');
const massive = require('massive');
const cors = require('cors')
const users = require('./controllers/users');
const contacts = require('./controllers/contacts')

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

    app.post('/api/contacts/:id', contacts.create);
    app.get('/api/contacts/:id', contacts.list);
    app.delete('/api/contacts/:id', contacts.delete);
    app.put('/api/contacts/:id', contacts.update)


    const PORT = 3007
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`) );
})