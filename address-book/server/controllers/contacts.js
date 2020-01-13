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
  const { userid } = req.params;

  db.contacts
    .insert({
      userid,
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

function getContactByUser(req, res) {
  const db = req.app.get("db");
  const { userid } = req.params;

  db.contacts
    .find({ userid: userid })
    .then(contacts => res.status(200).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  create,
  getContactByUser
};
