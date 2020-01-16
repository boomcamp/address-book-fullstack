module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const {
      userId,
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

    db.book
      .findOne({ userId })
      .then(data => {
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
          .catch(() => {
            res.status(500).end();
          });
      })
      .catch(() => {
        res.status(500).end();
      });
  },
  list: (req, res) => {
    const db = req.app.get("db");
    const { sort } = req.query;
    db.book.findOne({ userId: req.params.id }).then(data => {
      if (sort) {
        db.contacts
          .find(
            { bookId: data.id },
            {
              order: [{ field: sort, direction: "asc" }]
            }
          )
          .then(contact => {
            res.status(200).json(contact);
          })
          .catch(err => {
            console.error(err);
            res.status(500).end();
          });
      } else {
        db.contacts
          .find({ bookId: data.id })
          .then(contact => {
            res.status(200).json(contact);
          })
          .catch(err => {
            console.error(err);
            res.status(500).end();
          });
      }
    });
  },
  update: (req, res) => {
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

    db.contacts
      .update(
        { id: req.params.id },
        {
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
        }
      )
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
