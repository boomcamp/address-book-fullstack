const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const secret = require("../secret");
const cors = require("cors");
const users = require("./controllers/users");
const contacts = require("./controllers/contacts");
const group = require("./controllers/group");
const groupMember = require("./controllers/groupMember");

massive({
  host: "localhost",
  port: 5432,
  database: "addressbook",
  user: "postgres",
  password: "addressbook"
}).then(db => {
  const app = express();
  app.set("db", db);
  app.use(express.json());
  app.use(cors());
  //   const auth = (req, res, next) => {
  //     if (!req.headers.authorization) {
  //       return res.status(401).end();
  //     }
  //     try {
  //       const token = req.headers.authorization.split(" ")[1];
  //       jwt.verify(token, secret);
  //       next();
  //     } catch (err) {
  //       console.error(err);
  //       res.status(401).end();
  //     }
  //   };
  app.post("/signup/users", users.signup);
  //   app.get("/api/protected/data", users.auth);
  app.post("/signin", users.login);

  app.get("/users", users.getAll);
  app.get("/users/:username", users.getById);

  app.post("/contacts/:userid", contacts.create);
  app.get("/contacts/:userid", contacts.getContactByUser);
  app.get("/contacts/:userid/:contactid", contacts.getContactByContactId);
  app.patch("/contacts/:contactid", contacts.updateContact);
  app.delete("/contacts/:contactid", contacts.deleteContact);

  app.get("/group/:userid", group.getGroupsByUser);
  app.post("/group/:userid", group.addGroup);
  app.patch("/group/:groupid", group.updateGroupName);
  app.delete("/group/:groupid", group.deleteGroup);

  app.post("/groupmember", groupMember.addGroupMember);
  app.get("/groupmember", groupMember.getAllGroupMember);
  app.get("/groupmember/:contactid", groupMember.getContactGroups);
  app.get("/groupmembers/:groupid", groupMember.getGroupMembers);
  app.delete("/groupmember/:contactid", groupMember.deleteGroupMember);

  const PORT = 3004;
  app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
  });
});
