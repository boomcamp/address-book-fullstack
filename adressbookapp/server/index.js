const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const secret = require("../secret.js");
const users = require("./controllers/users.js");
const contacts = require("./controllers/contacts.js");
const groups = require("./controllers/groups.js");
const cors = require("cors");
massive({
  host: "localhost",
  port: 5432,
  database: "addressbookdb",
  user: "postgres",
  password: "addressbookdb"
})
  .then(db => {
    const app = express();
    app.use(cors());
    app.set("db", db);

    app.use(express.json());
    //users
    app.post("/api/register", users.register);
    app.post("/api/login", users.login);

    //contacts
    app.post("/api/contacts", contacts.contact);
    app.get("/api/contacts/:id", contacts.getContactById);
    app.delete("/api/contacts/:id", contacts.deleteContactById);
    app.patch("/api/contacts/:id", contacts.updateContactById);
    // app.get("/api/users/:id", users.getById);

    //groups
    app.post("/api/groups", groups.group);
    app.get("/api/groups/:id", groups.getGroupById);
    app.post("/api/addtogroups/", groups.addtoGroup);
    app.get("/api/selectedGroups/:id", groups.getSelectedGroups);
    app.get("/api/newGroups/:id", groups.newGroups);
    app.get("/api/groupContact/:id", groups.getGroupContact);
    app.get("/api/getGroupMemberById/:id", groups.getGroupMemberById);
    app.patch("/api/editGroups/:id", groups.updateGroupById);
    //protected-data
    app.get("/api/protected/data", (req, res) => {
      if (!req.headers.authorization) {
        return res.status(401).end();
      }

      try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, secret); // will throw when token is invalid
        res.status(200).json({ data: "here is the protected data" });
      } catch (err) {
        console.error(err);
        res.status(401).end();
      }
    });

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch(console.error);
