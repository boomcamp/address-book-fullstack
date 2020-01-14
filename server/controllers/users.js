const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { fname, lname, username, email, password } = req.body;
    db.users
      .findOne({
        username
      })
      .then(user => {
        if (user) {
          throw new Error("Email already taken!");
        }
        argon2
          .hash(password)
          .then(hash => {
            return db.users.insert(
              {
                fname,
                lname,
                username,
                email,
                password: hash
              },
              {
                fields: ["id", "fname", "lname", "username", "email"],
                deepInsert: true
              }
            );
          })
          .then(email => {
            const token = jwt.sign({ userId: email.id }, secret);
            res.status(200).json({ ...email, token });
            db.book.insert({ userId: email.id });
          });
      })
      .catch(err => {
        if ("Email already taken!".includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
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
          fields: ["id", "username", "fname", "lname", "email", "password"]
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
  listusers: (req, res) => {
    const db = req.app.get("db");
    db.users
      .find()
      .then(user => res.status(200).json({ users: user }))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
