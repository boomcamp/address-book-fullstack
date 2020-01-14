// var jwtDecode = require("jwt-decode");

function add(req, res) {
  const db = req.app.get("db");

  const { contactid, userid } = req.body;

  db.addressbook
    .insert({
      userid,
      contactid
    })
    .then(address => res.status(201).json(address))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  add
};
