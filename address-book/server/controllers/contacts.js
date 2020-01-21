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
    .then(contact => res.status(200).send(contact))
    .catch(err => {
      console.error(err);
    });
}

function getContactByUser(req, res) {
  const db = req.app.get("db");
  const { userid } = req.params;

  db.contacts
    .find({ userid })
    .then(contacts => res.status(200).send(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
}

function updateContact(req, res) {
  const db = req.app.get("db");
  const { contactid } = req.params;
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
    .save({
      id: contactid,
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
    .then(contact => res.status(200).send(contact))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
}

function deleteContact(req, res) {
  const db = req.app.get("db");
  const { contactid } = req.params;
  db.contacts
    .destroy({ id: contactid })
    .then(contacts => res.status(200).send(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });

  db.groupmembers
    .destroy({ contactid })
    .then(contacts => res.status(200).send(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
}

function getContactByContactId(req, res) {
  const db = req.app.get("db");
  const { contactid, userid } = req.params;

  db.contacts
    .find({ userid: userid, id: contactid })
    .then(contacts => res.status(200).send(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
}

module.exports = {
  create,
  getContactByUser,
  updateContact,
  getContactByContactId,
  deleteContact
};
