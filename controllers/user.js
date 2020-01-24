const argon2 = require("argon2");
const secret = require("../secret");
const jwt = require("jsonwebtoken");

module.exports = {
  signup: (req, res) => {
    const db = req.app.get("db");

    const { username, password } = req.body;

    db.users
      .findOne({ username })
      .then(data => {
        if (data) {
          throw new Error("Username already exists");
        } else {
          argon2
            .hash(password)
            .then(hash => {
              return db.users.insert(
                {
                  username,
                  password: hash
                },
                {
                  fields: ["id", "username"]
                }
              );
            })
            .then(user => {
              const token = jwt.sign({ username: user.id }, secret);
              res.status(201).json({ ...user, token });
            })
            .catch(err => {
              console.error(err);
              res.status(500).end();
            });
        }
      })
      .catch(err => {
        if (["Username already exists"].includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          res.status(500).end();
        }
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
          fields: ["id", "username", "password"]
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

          const token = jwt.sign({ userid: user.id }, secret);
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
  getUser: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

      console.log(req.params.userid);

      const { userid } = req.params;

      const db = req.app.get("db");

      db.users
        .findOne({ userid })
        .then(data => {
          res.status(200).json(data);
        })
        .catch(err => {
          console.error(err);
          res.status(401).end();
        });
    } catch (error) {
      console.error(err);
      res.status(401).end();
    }
  }
};
