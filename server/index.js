const express = require("express");
const massive = require("massive");
const cors = require("cors");
const secret = require("../secret");

const validate = require("../controllers/validations");
const contact = require("../controllers/contacts");

massive({
  host: "localhost",
  port: 5432,
  database: "fullstack",
  user: "postgres",
  password: "fullstackDB"
})
  .then(db => {
    const app = express();

    app.set("db", db);
    app.use(cors());
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

    //USER'S ENDPOINT
    app.post("/register", validate.register);
    app.post("/login", validate.login);

    //CONTACT'S ENDPOINT
    app.get("/contacts/:id/all", contact.allContacts);
    app.post("/contacts/create", auth, contact.createContact);

    const PORT = 4001;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(() => console.log("Error"));
