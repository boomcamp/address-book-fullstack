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

    app.post("/api/register", users.register);
    app.get("/api/users", users.list);

    app.post("/api/login", users.login);

    const PORT = 5009;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch(console.error);
