const express = require("express");
const massive = require("massive");
const user = require("../controllers/users");
const contacts = require("../controllers/contacts");
const { auth } = require("../controllers/auth");
const valid = require("../controllers/validate");
const cors = require("cors");
const groups = require("../controllers/groups");

massive({
  host: "localhost",
  port: 5432,
  database: "fullstackdb",
  user: "postgres",
  password: "fullstackdb"
}).then(db => {
  const app = express();
  // database
  app.set("db", db);

  // variables
  const port = 4000;
  const host = "http";
  const baseUrl = "localhost";

  // middleware
  app.use(express.json());
  app.use(cors());

  // users endpoints
  app.post("/api/register", valid.user, user.register);
  app.post("/api/login", user.login);

  // contact endpoints
  app.get("/api/user/:id/addressbook", auth, contacts.list);
  app.post("/api/contacts", auth, contacts.addNewContact);
  app.patch("/api/contacts/:id", auth, valid.contact, contacts.updateContact);
  app.delete("/api/contacts/:id", auth, valid.contact, contacts.deleteContact);
  app.get("/api/contacts/:id", auth, valid.contact, contacts.viewDetails);

  // group endpoints
  app.post("/api/groups", auth, groups.addNew);
  app.patch("/api/groups", auth, valid.group, groups.editGroup);
  app.delete("/api/groups/:id", auth, groups.delete);
  app.get("/api/groups/:id/list", auth, valid.group, groups.list);
  app.get("/api/groups/:id", auth, valid.group, groups.viewDetails);

  // listen
  app.listen(port, () => {
    console.clear();
    console.info("\x1b[32m", `\n\n  ^.^ --- Welcome to server! --- ^.^`);
    console.info(`\n\n  Server is listening on port ${port} ...`);
    console.info("\x1b[37m", `\n\n  ${host}://${baseUrl}:${port}/api/`);
  });
});
