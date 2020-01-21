const express = require("express");
const massive = require("massive");
const jwt = require("jsonwebtoken");
const reg = require("./controllers/user");
const addcontact = require("./controllers/addcontacts");
const addgroup = require("./controllers/group");

const cors = require("cors");
massive({
  host: "localhost",
  port: 5432,
  database: "add_book",
  user: "postgres",
  password: "delfz"
})
  .then(db => {
    const app = express();
    app.set("db", db);
    app.use(express.json());
    app.use(cors());
    //suser
    app.post("/api/register", reg.register);
    app.post("/api/login", reg.login);

    app.get("/api/users", reg.list);
    app.get("/api/allContacts/:id", addcontact.allcontacts);
    app.delete("/api/deleteContact/:id", addcontact.delete);
    app.patch("/api/update/:id", addcontact.update);
   //groups
    app.post("/api/addgroup", addgroup.addgroup);
    app.post("/api/addtogroup", addgroup.addtogroup);
    app.get("/api/allgroups/:id", addgroup.allgroups);
//groupmembers
    app.get("/api/groupsmember/:id", addgroup.groupmembers);
    


    // app.get('/addressbook/:id', contacts.contactList);

    app.post("/api/create", addcontact.addcontact);


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
    const PORT = 3003;
    app.listen(PORT, () => {
      console.log(`Server d-,-b on port ${PORT}`);
    });
  })
  .catch(console.error);
