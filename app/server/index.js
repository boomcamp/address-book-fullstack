const express = require("express");
const massive = require("massive");
const users = require("../controllers/users.js");
const jwt = require("jsonwebtoken");
const secret = require("../secret.js");
const contact = require("../controllers/contact");

massive({
  host: "localhost",
  port: 5432,
  database: "addressbook",
  user: "postgres",
  password: "node5db"
})
  .then(db => {
    const app = express();
    app.set("db", db);
    app.use(express.json());

    function authentication(req, res, next) {
      if (!req.headers.authorization) {
        res.status(200).json({ data: "Incorrect token" });
      }

      try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, secret); // will throw an Error when token is invalid!!!
        next();
      } catch (err) {
        console.error(err);
        res.status(401).json({ data: "Incorrect token" });
      }
    }

    app.post("/users/register", users.register);
    app.post("/login", users.login);
    app.get("/users/list", authentication, users.userlist);
    app.post("/contact", contact.addcontact);

    const port = 5000;

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  })
  .catch(console.error);
