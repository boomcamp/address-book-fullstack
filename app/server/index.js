const express = require("express");
const massive = require("massive");
const cors = require("cors");

const user = require("./controllers/users");
const contacts = require("./controllers/contacts");
const group = require("./controllers/group");

massive({
	host: "localhost",
	port: 5432,
	database: "addressbookdb",
	user: "postgres",
	password: "addressbookdb"
}).then(db => {
	const app = express();

	app.set("db", db);
	app.use(express.json());
	app.use(cors());

	// users
	app.post("/users", user.register);
	app.post("/users/login", user.login);
	app.get("/users", user.getUsers);
	app.get("/users/:username", user.getUsersByUsername);

	// contacts
	app.post("/contacts/:userid", contacts.create);
	app.get("/contacts/:userid", contacts.getContactsByUser);
	app.get("/contacts/:userid/:contactid", contacts.getContactByContactId);
	app.patch("/contacts/:contactid", contacts.editContact);
	app.delete("/contacts/:contactid", contacts.deleteContact);

	// group
	app.post("/group-contacts/", group.create);
	app.get("/group-contacts/", group.getList);
	app.get("/group-contacts/:userid", group.getGroupsByUser);
	app.delete("/group-contacts/:groupid", group.deleteGroup);
	app.patch("/group-contacts/:groupid", group.editGroup);

	const PORT = 3006;
	app.listen(PORT, () => {
		console.log(`Server is Listening on port ${PORT}`);
	});
});
