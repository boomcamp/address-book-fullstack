const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  register: (req, res) => {
    const { users } = req.app.get("db");
    const { username, email, password, first_name, last_name } = req.body;
    users
      .findOne({ email: email })
      .then(user => {
        if (user) {
          throw new Error("Email already exists");
        }

        argon2
          .hash(password)
          .then(hash => {
            return users.insert(
              { username, email, password: hash, first_name, last_name },
              { fields: ["id", "username", "email", "first_name", "last_name"] }
            );
          })
          .then(user => {
            const token = jwt.sign({ user_id: user.id }, secret.key);
            res.status(201).send({ ...user, token });
          });
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  },
  login: (req, res) => {
    const { users } = req.app.get("db");
    const { username, password } = req.body;

    users
      .findOne({ username: username })
      .then(user => {
        if (!user) {
          throw new Error("Invalid username");
        }
        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error("Incorrect password");
          }
          const token = jwt.sign({ user_id: user.id }, secret.key);
          delete user.password;
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  }
};
