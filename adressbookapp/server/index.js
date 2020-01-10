const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const secret = require("../secret.js");
const users = require("./controllers/users.js");
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
    // app.get("/api/users/:id", users.getById);
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
