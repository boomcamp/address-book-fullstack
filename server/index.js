const express = require('express');
const massive = require('massive');

const auth = require('./controllers/auth');
const users = require('./controllers/users');
const contacts = require('./controllers/contacts');
const groups = require('./controllers/groups');
const members = require('./controllers/members');

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
	app.get('/api/users', users.userlist);
	app.get('/api/users/:id', auth, users.details);

	//Contacts
	app.post('/api/contacts/create', auth, contacts.create);
	app.get('/api/contacts/userId-:id', auth, contacts.view);
	app.patch('/api/contacts/update/:id', auth, contacts.updateContact);
	app.delete('/api/contacts/delete/:id', auth, contacts.deleteContact);
	app.get('/api/contacts/search/:id', auth, contacts.search);
	app.get('/api/contacts/sort/:id', auth, contacts.sort);

	//Groups
	app.post('/api/groups/create', auth, groups.createGroup);
	app.get('/api/groups/userId-:id', auth, groups.viewGroup);
	app.patch('/api/groups/update/:id', auth, groups.updateGroup);
	app.delete('/api/groups/delete/:id', auth, groups.deleteGroup);

	//Members
	app.post('/api/members/create', auth, members.createMember);
	app.get(
		'/api/members/user-:userid/group-:groupid',
		auth,
		members.viewGroupMember
	);
	app.delete('/api/members/delete/:id', auth, members.deleteMember);

	const port = 5000;
	app.listen(port, () => console.log(`Server listening on port ${port}`));
});
