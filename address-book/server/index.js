const express = require("express");
const massive = require("massive");
const cors = require("cors");
const users = require("./controllers/users");
const contacts = require("./controllers/contacts");

massive({
  host: "localhost",
  port: 5433,
  database: "addressbookdb",
  user: "postgres",
  password: "addressbookdb"
})
  .then(db => {
    const app = express();
    app.use(cors());
    app.set("db", db);

    app.use(express.json());
    ///users

    app.post("/users", users.create);
    app.post("/login", users.login);
    ///contacts
    app.post("/createcontact", contacts.createContact);
    app.get('/addressbook/view/:id', contacts.getById);
    app.get('/addressbook/:id', contacts.contactList);
    
    
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
