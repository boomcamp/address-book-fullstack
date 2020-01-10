const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");
const cors = require("cors");

const users = require("./controllers/users");

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

  app.post("/signup/users", users.signup);
  app.post("/signin", users.login);
  app.get("/users", users.getAll);
  app.get("/users/:username", users.getById);
  //   app.get("/api/protected/data", users.auth);
  //   app.post("/api/login", users.login);

  const PORT = 3004;
  app.listen(PORT, () => {
    console.log(`Server is Listening on port ${PORT}`);
  });
});
