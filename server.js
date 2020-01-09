const express = require("express");
const users = require("./controllers/user");
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
    app.set("db",db)

    const PORT = 5000;

    app.post("/api/signup", users.signup);

    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
    
  }).catch(err=>{
      console.error(err)
  })
