const express = require("express");
const users = require("./controllers/user");
const contacts = require("./controllers/contacts");
const groups = require("./controllers/group");
const cors = require("cors");

const massive = require("massive");

massive({
  host: "localhost",
  port: 5432,
  database: "address_book",
  user: "postgres",
  password: "perndb"
})
  .then(db => {
    const app = express();
    app.set("db", db);
    app.use(express.json());
    app.use(cors());
    const PORT = 5000;

    // users endpoints
    app.post("/api/signup", users.signup);
    app.post("/api/login", users.login);

    // contacts endpoints
    app.post("/api/contact/save", contacts.save);
    app.get("/api/contacts", contacts.getAll);
    app.delete("/api/contact/delete/:id", contacts.delete);
    app.put("/api/contact/update/:id", contacts.update);

    // groups endpoints
    app.post("/api/contacts/group/add", groups.add);
    app.get("/api/contacts/groups", groups.getAll);
    app.post("/api/contacts/groups/reference", groups.addReference);

    app.get("/api/contacts/groups/reference/retrieve/:id", groups.retieve);
    
    

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
