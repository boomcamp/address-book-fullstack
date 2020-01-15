module.exports = {
  addcontact: (req, res) => {
    const db = req.app.get("db");
    const {
      lastname,
      firstname,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      stae_or_province,
      postal_code,
      country
    } = req.body;

    db.contact_info
      .insert({
        lastname,
        firstname,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        stae_or_province,
        postal_code,
        country
      })

      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  allcontacts: (req, res) => {
    const db = req.app.get("db");
    db.contact_info
      .find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const id = req.params.id;
    db.query(
      `
    DELETE from contact_info where id = ${id}`
    )
      .then(() => {
        db.query(` DELETE from contact_info where id = ${id}`);
      })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).end();
      });
  }
};
