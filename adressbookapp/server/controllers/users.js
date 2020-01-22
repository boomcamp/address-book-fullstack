const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret.js");

function register(req, res) {
  const db = req.app.get("db");
  const { firstname, lastname, username, email, password } = req.body;
  db.query(`SELECT * from users where username = '${username}'`).then(x => {
    if (x.length > 0) {
      res.send({ message: "Username is already taken" });
    } else {
      argon2
        .hash(password)
        .then(hash => {
          return db.users.insert(
            {
              firstname,
              lastname,
              username,
              email,
              password: hash
            },
            {
              fields: [
                "id",
                "firstname",
                "lastname",
                "username",
                "email",
                "password"
              ]
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
    }
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
        fields: ["id", "username", "email", "firstname", "lastname", "password"]
      }
    )
    .then(user => {
      if (!user) {
        throw new Error("Invalid username");
      }

      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error("wrong password");
        }

        const token = jwt.sign({ userId: user.id }, secret);
        delete user.password; // remove password hash from returned user object
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
}

module.exports = {
  register,
  login
};
