const express = require("express");
const massive = require("massive");
const cors = require("cors");
const users = require("../controllers/users");

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

    app.post("/api/register", users.register);
    app.get("/api/users", users.list);

    app.post("/api/login", users.login);

    app.post("/api/contacts/add", users.addContact);
    app.get("/api/contacts/:id", users.contacts);
    app.patch("/api/contacts/:id/edit", users.editContact);
    app.delete("/api/contacts/:id/delete", users.deleteContact);

    const PORT = 5009;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
