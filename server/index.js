const express = require("express");
const massive = require("massive");
const cors = require("cors");

const users = require("../controller/users");
const contact = require("../controller/contacts");
const group = require("../controller/group");

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

  app.post("/register", users.register);
  app.post("/login", users.login);

  app.post("/add-contact", contact.addcontact);
  app.get("/contact-list/:id", contact.contactList);
  app.patch("/update-contact/:id", contact.editContact);
  app.delete("/delete-contact/:id", contact.deleteContact);

  app.post("/create-group", group.addgroup);

  const PORT = 4005;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
