const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  save: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

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
        country,
        userid
      } = req.body;

      console.log("city is : ", city);

      const db = req.app.get("db");

      db.contacts
        .save({
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
        .then(post => {
          console.log(post);

          db.address_book
            .save({
              contactid: post.id,
              userid: userid,
              active: true
            })
            .then(data => {
              res.status(201).json(post);
            })
            .catch(err => {
              res.status(500).end();
            });
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  },
  getAll: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

      const db = req.app.get("db");

      const { userid } = req.body;

      console.log(req.params.userid);

      db.query(
        `SELECT contacts.id, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_or_province, postal_code, country 
        FROM contacts 
        INNER JOIN address_book 
        ON address_book.contactid = contacts.id 
        WHERE address_book.userid = ${req.params.userid}`
      )
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(500).end();
        });

      // db.contacts
      //   .find()
      //   .then(post => {
      //     res.status(200).json(post);
      //   })
      //   .catch(err => {
      //     res.status(500).end();
      //   });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  },
  delete: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

      const db = req.app.get("db");

      db.groups_track
        .destroy({ contactid: req.params.id })
        .then(post => {
          db.address_book
            .destroy({ contactid: req.params.id })
            .then(post => {
              res.status(200).json(post);

              db.contacts
                .destroy({ id: req.params.id })
                .then(post => {
                  res.status(200).json(post);
                })
                .catch(err => {
                  res.status(500).end();
                });
            })
            .catch(err => {
              res.status(500).end();
            });

          res.status(200).json(post);
        })
        .catch(err => {
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  },
  update: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

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
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  },
  sort: (req, res) => {
    const db = req.app.get("db");

    // const { sortType } = db.body;

    console.log(req.params.order)

    db.query(
      `SELECT contacts.id, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_or_province, postal_code, country 
      FROM contacts 
      INNER JOIN address_book 
      ON address_book.contactid = contacts.id 
      WHERE address_book.userid = ${req.params.id} 
      ORDER BY last_name ${req.params.order}`
    )
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err)
      res.status(500).end();
    });
  }
};
