const express = require("express");
const massive = require("massive");
const cors = require("cors");

const user = require("./controllers/users");
const contacts = require("./controllers/contacts");

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

	app.post("/users", user.register);
	app.post("/users/login", user.login);
	app.get("/users", user.getUsers);
	app.get("/users/:username", user.getUsersByUsername);

	app.post("/contacts/:userid", contacts.create);
	app.get("/contacts/:userid", contacts.getContactsByUser);

	const PORT = 3006;
	app.listen(PORT, () => {
		console.log(`Server is Listening on port ${PORT}`);
	});
});
