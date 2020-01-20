const express = require("express");
const massive = require("massive");
const secret = require("../secret");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const users = require("../controllers/users");
const contacts = require("../controllers/contacts");
const groups = require("../controllers/groups");

massive({
  host: "localhost",
  port: 5432,
  database: "addressbook",
  user: "postgres",
  password: "addressbookdb"
})
  .then(db => {
    const app = express();
    app.set("db", db);
    app.use(express.json());
    app.use(cors());

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
    //User endpoints
    app.post("/api/register", users.register);
    app.get("/api/users", users.list);
    app.post("/api/login", users.login);
    //Contact endpoints
    app.post("/api/contacts/add", contacts.addContact);
    app.get("/api/contacts/:id", contacts.contacts);
    app.patch("/api/contacts/:id/edit", contacts.editContact);
    app.delete("/api/contacts/:id/delete", contacts.deleteContact);
    //Group endpoints
    app.post("/api/groups/add", groups.addGroups);
    app.get("/api/groups", groups.listGroups);
    app.delete("/api/groups/:id/delete", groups.deleteGroup);
    app.patch("/api/groups/:id/edit", groups.editGroup);

    const PORT = 5009;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
