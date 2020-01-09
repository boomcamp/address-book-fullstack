const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

const users = require("./controllers/users");
const contacts = require("./controllers/contacts");

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

  app.post("/api/signup", users.create);
  app.post("/api/login", users.login);
  app.get("/api/users/:id/book", users.getbook);

  app.use(auth);

  app.post("/api/book/:id", contacts.create);
  app.get("/api/contacts/list", contacts.list);
  app.patch("/api/contacts/:id", contacts.updateContact);

  const port = 3001;

  app.listen(port, () => {
    console.log(`Server is ready on port ${port}`);
  });
});
