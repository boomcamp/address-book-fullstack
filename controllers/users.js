const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  register: (req, res) => {
    const db = req.app.get("db");
    const { username, fname, lname, email, password } = req.body;

    db.users
      .findOne({
        email: email
      })
      .then(user => {
        if (user) {
          throw new Error("Email already exists!");
        }

        argon2
          .hash(password)
          .then(hash => {
            return db.users.insert(
              {
                username,
                fname,
                lname,
                email,
                password: hash
              },
              {
                deepInsert: true
              },
              {
                fields: ["id", "username", "fname", "lname", "email"]
              }
            );
          })
          .then(user => {
            const token = jwt.sign({ userId: user.id }, secret);
            res.status(201).json({ ...user, token });
          });
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  list: (req, res) => {
    const db = req.app.get("db");

    db.users
      .find()
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  login: (req, res) => {
    const db = req.app.get("db");
    const { username, password } = req.body;

    db.users
      .findOne(
        {
          username
        },
        {
          fields: ["id", "username", "email", "password"]
        }
      )
      .then(user => {
        if (!user) {
          throw new Error("Incorrect username/password");
        }

        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error("Incorrect username/password");
          }

          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password;
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (
          [
            "Incorrect username/password",
            "Incorrect username/password"
          ].includes(err.message)
        ) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  },
  contacts: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .find({ userId: req.params.id })
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
      .update({ userId: req.params.id }, req.body)
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
