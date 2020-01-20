const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  register: (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, email, username, password } = req.body;

    argon2
      .hash(password)
      .then(hash => {
        return db.users.insert(
          {
            first_name,
            last_name,
            email,
            username,
            password: hash
          },
          {
            fields: ["id", "first_name", "last_name", "username", "email"]
          }
        );
      })
      .then(user => {
        const token = jwt.sign({ user_id: user.id }, secret);
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
      .findOne({
        username
      })
      .then(user => {
        if (!user) {
          throw new Error("Incorrect input in username/password");
        }

        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error("Incorrect input in username/password");
          }

          const token = jwt.sign({ user_id: user.id }, secret);
          delete user.password;
          res.status(200).json({ ...user, token });
        });
      })
      .catch(err => {
        if (
          [
            "Incorrect input in username/password",
            "Incorrect input in username/password"
          ].includes(err.message)
        ) {
          res.status(200).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  }
};
