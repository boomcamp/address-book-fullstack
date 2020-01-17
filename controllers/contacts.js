module.exports = {
  contacts: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .find({ user_id: req.params.id })
      .then(contacts => res.status(200).json(contacts))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  addContact: (req, res) => {
    const db = req.app.get("db");
    const { email } = req.body;
    db.contacts
      .findOne({
        email: email
      })
      .then(contacts => {
        if (contacts) {
          throw new Error("Email already exists!");
        }

        db.contacts
          .insert(req.body)
          .then(contact => res.status(200).send(contact));
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  editContact: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .update({ id: req.params.id }, req.body)
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
      });
  },
  deleteContact: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .destroy({ id: req.params.id })
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
