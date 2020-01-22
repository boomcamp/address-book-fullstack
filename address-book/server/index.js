const express = require("express");
const massive = require("massive");
const cors = require("cors");
const users = require("./controllers/users");
const contacts = require("./controllers/contacts");
const groups = require("./controllers/group");

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

  //signup
  app.post("/signup/users", users.signup);
  //signin
  app.post("/signin", users.login);

  //fetching users
  app.get("/users", users.getAll);
  app.get("/users/:username", users.getById);

  //contacts
  app.post("/contacts/:userid", contacts.create);
  app.patch("/contacts/:contactid", contacts.updateContact);
  app.delete("/contacts/:contactid", contacts.deleteContact);
  app.get("/contacts/:userid/:contactid", contacts.getContactByContactId);
  app.get("/contacts/:userid", contacts.getContactByUser);

  //groupcontacts
  app.post("/groupcontacts/", groups.create);
  app.get("/groupcontacts/:userid", groups.getGroups);
  app.delete("/groupcontacts/:groupid", groups.deleteGroup);
  app.patch("/groupcontacts/:groupid", groups.updateGroupContact);

  //groupmembers
  app.post("/groupmembers/", groups.addMember);
  app.get("/groupmembers/:contactid", groups.getContactGroups);
  app.delete("/groupmembers/:contactid", groups.deleteGroupMember);
  app.delete("/deletegroupmembers/:id", groups.deleteGroupMembersByID);
  app.get("/getgroupmembers/:groupid", groups.getContactGroupMembers);

  const PORT = 3004;
  app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
  });
});
