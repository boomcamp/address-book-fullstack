const express = require('express');
const massive = require('massive');

const auth = require('./controllers/auth');
const users = require('./controllers/users');
const contacts = require('./controllers/contacts');

massive({
	host: 'localhost',
	port: 5432,
	database: 'fullstackdb',
	user: 'postgres',
	password: 'fullstackdb'
}).then(db => {
	const app = express();
	app.set('db', db);
	app.use(express.json());

	//Users
	app.post('/api/users/create', users.create);
	app.post('/api/users/login', users.login);
	app.get('/api/users', auth, users.userlist);

	//Contacts
	app.post('/api/contacts/create', auth, contacts.create);
	app.get('/api/contacts/userId-:id', auth, contacts.view);
	app.patch('/api/contacts/update/:id', auth, contacts.updateContact);
	app.delete('/api/contacts/delete/:id', auth, contacts.deleteContact);

	const port = 5000;
	app.listen(port, () => console.log(`Server listening on port ${port}`));
});
