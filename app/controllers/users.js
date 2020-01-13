const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../secret.js");

function register(req, res) {
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
          fields: [
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "password"
          ]
        }
      );
    })
    .then(user => {
      const token = jwt.sign({ userId: user.id }, secret);
      res.status(200).json({ ...user, token });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end;
    });
}

function login(req, res) {
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
        throw new Error("Invalid Emailname");
      }
      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error("Invalid Password");
        }

        const token = jwt.sign({ userId: user.id }, secret);
        delete user.password;
        res.status(201).json({ ...user, token });
      });
    })
    .catch(error => {
      if (["Invalid emailname", "Incorrect password"].includes(error.message)) {
        res.status(200).json({ err: error.message });
      } else {
        console.error(error);
        res.status(500).end();
      }
    });
}

function userlist(req, res) {
  const db = req.app.get("db");

  db.users
    .find()
    .then(user => res.status(200).json(user))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}
module.exports = {
  register,
  login,
  userlist
};
