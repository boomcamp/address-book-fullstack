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
        country
      } = req.body;

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

      db.contacts
        .find()
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
  delete: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

      const db = req.app.get("db");

      db.contacts
        .destroy({ id: req.params.id })
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
  }
};
