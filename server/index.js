const express = require("express");
const massive = require("massive");
const data = require("../controllers/data");
const user = require("../controllers/users");
const addressbook = require("../controllers/addressbook");
const contacts = require("../controllers/contacts");
const { auth } = require("../controllers/auth");
const bodyParser = require("body-parser");

massive({
  host: "localhost",
  port: 5432,
  database: "fullstackdb",
  user: "postgres",
  password: "fullstackdb"
}).then(db => {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  // database
  app.set("db", db);

  // variables
  const port = 4000;
  const host = "http";
  const baseUrl = "localhost";

  // middleware
  app.use(express.json());

  // database endpoints
  app.get("/api/data/users", data.users);
  app.get("/api/data/contacts", data.contacts);

  // users endpoints
  app.post("/api/register", user.register);
  app.post("/api/login", user.login);

  // addressbook endpoint
  app.get("/api/user/:id/addressbook", auth, addressbook.list);

  // contacts endpoint
  app.post("/api/contacts", auth, contacts.addNewContact);

  // listen
  app.listen(port, () => {
    console.clear();
    console.info("\x1b[32m", `\n\n  ^.^ --- Welcome to server! --- ^.^`);
    console.info(`\n\n  Server is listening on port ${port} ...`);
    console.info("\x1b[37m", `\n\n  ${host}://${baseUrl}:${port}/api/`);
  });
});
