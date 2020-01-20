const express = require('express');
const massive = require('massive');
const cors = require('cors')
const user = require('../controllers/user')
const userContact = require('../controllers/userContact')
const groups = require('../controllers/userGroup')

massive({
    host: 'localhost',  
    port: 5432,
    database: 'addressbook',
    user: 'postgres',
    password: 'addressbook',
}).then(db => {
    const app = express();
    app.use(cors())

    app.set('db', db);

    app.use(express.json());

    app.post('/addressbook/register', user.register);
    app.post('/addressbook/login', user.login);
    app.post('/addressbook/addcontact', userContact.createContact);
    app.get('/addressbook/getcontact', userContact.getContact);
    app.get('/addressbook/getandsortcontact/:sort', userContact.sortContact);
    app.patch('/addressbook/getcontact/:id/update', userContact.updateContact);
    app.delete('/addressbook/getcontact/:id/delete', userContact.deleteContact);
    app.post('/addressbook/addgroup', groups.createGroup);
    app.get('/addressbook/getgroup', groups.getGroup);
    app.post('/addressbook/addmember', groups.addMember);
    app.get('/addressbook/getgroupmember', groups.getGroupMember);
    app.delete('/addressbook/deletegroup/:id', groups.DeleteGroup);
    app.get('/addressbook/getcontacttoadd/:id', groups.getContacttoAdd);
    app.delete('/addressbook/removemember/:id', groups.removemember);

    const PORT = 4001;
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
});