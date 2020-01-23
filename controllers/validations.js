const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  register: (req, res) => {
    const db = req.app.get("db");
    const { username, email, password, firstName, lastName } = req.body;

    argon2
      .hash(password)
      .then(hash => {
        return db.users.insert(
          {
            firstName,
            lastName,
            username,
            email,
            password: hash
          },
          {
            fields: ["id", "firstName", "lastName", "username", "email"]
          }
        );
      })
      .then(user => {
        const token = jwt.sign({ userId: user.id }, secret);
        res.status(201).json({ ...user, token });
      })
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
          throw new Error("Invalid username");
        }

        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error("Incorrect password");
          }

          const token = jwt.sign({ userId: user.id }, secret);
          delete user.password;
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (["Invalid username", "Incorrect password"].includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  },
  fetchUser: (req, res) => {
    const db = req.app.get("db");

    db.users
      .find({ id: req.params.id })
      .then(users => res.status(200).json(users))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  user: (req, res, next) => {
    const db = req.app.get("db");
    const { username } = req.body;
    db.users
      .findOne({ username: username })
      .then(user => {
        if (user) {
          throw new Error("Username already exists");
        }
        next();
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  email: (req, res, next) => {
    const db = req.app.get("db");
    const { email } = req.body;
    db.users
      .findOne({ email: email })
      .then(email => {
        if (email) {
          throw new Error("Email already exists");
        }
        next();
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  }
};
