const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  register: (req, res) => {
    const { users } = req.app.get("db");
    const { username, email, password } = req.body;
    users
      .findOne({ email: email })
      .then(user => {
        if (user) {
          throw new Error("email already exists");
        }

        argon2
          .hash(password)
          .then(hash => {
            return users.insert(
              { username, email, password: hash },
              { fields: ["id", "username", "email"] }
            );
          })
          .then(user => {
            const token = jwt.sign({ userId: user.id }, secret);
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
    const { email, password } = req.body;

    users
      .findOne({ email: email })
      .then(user => {
        if (!user) {
          throw new Error("Invalid email");
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
        err.message
          ? res.status(400).json({ error: err.message })
          : res.status(500).end();
      });
  }
};
