module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const {
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

    db.book.findOne(userId).then(data => {
      return db.contacts
        .insert({
          bookId: data.id,
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
        })
        .then(contact => res.status(200).json(contact))
        .catch(err => {
          console.error(err);
          res.status(500).end();
        });
    });
  },
  list: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .find({ bookId: req.params.id })
      .then(contact => {
        res.status(200).json(contact);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  update: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {
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
      .save({
        id,
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
      })
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  delete: (req, res) => {
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
