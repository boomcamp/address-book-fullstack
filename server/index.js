const express = require("express");
const massive = require("massive");
const cors = require("cors");
const secret = require("../secret");
const jwt = require("jsonwebtoken");

const validate = require("../controllers/validations");
const contact = require("../controllers/contacts");
const group = require("../controllers/groups");
const addressbook = require("../controllers/addressbook.js");

massive({
  host: "localhost",
  port: 5432,
  database: "fullstack",
  user: "postgres",
  password: "fullstackDB"
}).then(db => {
  const app = express();

  app.set("db", db);
  app.use(cors());
  app.use(express.json());

  const auth = (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }
    try {
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret);
      next();
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  };

  //USER'S ENDPOINT
  app.post("/register", validate.user, validate.email, validate.register);
  app.post("/login", validate.login);
  app.get("/fetch/:id", validate.fetchUser);

  //CONTACT'S ENDPOINT
  app.get("/contacts/:id/all", auth, contact.allContacts);
  app.post("/contacts/create", auth, contact.email, contact.createContact);
  app.patch("/contacts/:id/edit", auth, contact.editContact);
  app.delete("/contacts/:id/delete", auth, contact.deleteContact);

  //GROUP'S ENDPOINT
  app.get("/groups/:id/all", auth, group.groupsByUser);
  app.get("/groups/:id/contacts", auth, group.contactsByGroup);
  app.post("/groups/create", auth, group.createGroup);
  app.patch("/groups/:id/add", auth, group.addToGroup);
  app.patch("/groups/:id/edit", auth, group.editGroup);
  app.delete("/groups/:id/delete", auth, group.deleteGroup);

  //ADDRESSBOOK ENDPOINT
  app.get("/addressbook/:id/all", auth, addressbook.fetchAddressBook);

  const PORT = 4001;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
// .catch(() => console.log("Error"));
