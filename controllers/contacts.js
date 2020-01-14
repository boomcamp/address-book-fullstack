module.exports = {
  allContacts: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .find({ user_id: req.params.id })
      .then(contacts => res.status(200).json(contacts))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  createContact: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .insert(req.body, {
        fields: [
          "id",
          "first_name",
          "last_name",
          "email",
          "home_phone",
          "mobile_phone",
          "work_phone",
          "city",
          "state_or_province",
          "postal_code",
          "country"
        ]
      })
      .then(contacts => {
        res.status(201).json(contacts);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  editContact: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .update({ id: req.params.id }, req.body)
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  deleteContact: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .destroy({ id: req.params.id })
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
