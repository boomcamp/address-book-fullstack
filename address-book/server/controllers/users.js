const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

function create(req, res) {
  const db = req.app.get("db");
  const { firstname, lastname, username, email, password } = req.body;
  db.users
  .find({username: username})
  .then(x => {
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
        fields: ["id", "username", "password"]
      }
    )
    .then(user => {
      if (!user) {
        throw new Error("Incorrect Username");
      }
      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error("Incorrect Password");
        }
        const token = jwt.sign({ userid: user.id }, secret);
        delete user.password;
        res.status(200).json({ ...user, token });
      });
    })
    .catch(err => {
      if (["Incorrect Username", "Incorrect Password"].includes(err.message)) {
        res.status(200).json({ error: err.message });
      } else {
        res.status(500).end();
      }
    });
}
module.exports = {
  create,
  login
};
