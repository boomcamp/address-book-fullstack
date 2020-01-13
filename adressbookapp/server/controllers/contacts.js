const secret = require("../../secret.js");

function contact(req, res) {
  const db = req.app.get("db");
  const {
    userId,
    firstname,
    lastname,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country
  } = req.body;

  db.contacts // heres the new stuff, using massive to actually query the database.
    .insert({
      userId,
      firstname,
      lastname,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      state_or_province,
      postal_code,
      country
    })
    .then(contact => res.status(201).json(contact)) // returns a promise so we need to use .then
    .catch(err => {
      console.error(err); // if something happens we handle the error as well.
      res.status(500).end();
    });
}

module.exports = {
  contact
};
