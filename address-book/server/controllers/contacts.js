function create(req, res) {
  const db = req.app.get("db");
  const {
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
  db.contacts
    .insert({
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
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
    });
}
function getAll(req, res) {
  const db = req.app.get("db");
  db.contacts
    .find()
    .then(contacts => res.status(200).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
module.exports = {
  create,
  getAll
};
