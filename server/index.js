const express = require("express");
const massive = require("massive");
const cors = require("cors");

const users = require("./controllers/users");
const contacts = require("./controllers/contacts");
const auth = require("./controllers/auth");

massive({
  host: "localhost",
  port: 5432,
  database: "addressbookdb",
  user: "postgres",
  password: "addressdb"
}).then(db => {
  const app = express();

  app.set("db", db);
  app.use(express.json());
  app.use(cors());

  app.post("/signup", users.create);
  app.post("/login", users.login);
  app.get("/users", users.listusers);

  app.use(auth.token);

  app.post("/contacts/create", contacts.create);
  app.get("/contacts/list/:id", contacts.list);
  app.patch("/contacts/edit/:id", contacts.update);
  app.delete("/contacts/delete/:id", contacts.delete);
  const port = 3001;

  app.listen(port, () => {
    console.log(`Server is ready on port ${port}`);
  });
});
