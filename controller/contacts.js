module.exports = {
  addcontact: (req, res) => {
    const db = req.app.get("db");
    const {
      user_id,
      first_name,
      last_name,
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
      .insert(
        {
          user_id,
          first_name,
          last_name,
          email,
          home_phone,
          mobile_phone,
          work_phone,
          city,
          state_or_province,
          postal_code,
          country
        },
        {
          fields: [
            "id",
            "user_id",
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
        }
      )
      .then(contact => {
        res.status(201).json({ contact });
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  contactList: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .find({ user_id: req.params.id })
      .then(users => res.status(200).json(users))
      .catch(err => {
        res.status(500).end();
      });
  },

  editContact: (req, res) => {
    const db = req.app.get("db");
    const contact = req.body;
    const id = req.params.id;

    db.contacts
      .update(id, contact)
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  deleteContact: (req, res) => {
    const db = req.app.get("db");
    const contact = req.body;
    const id = req.params.id;

    db.contacts
      .destroy(id, contact)
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
