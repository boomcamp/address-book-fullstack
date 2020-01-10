const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

function  create (req, res)  {
  const db = req.app.get("db");
  const { firstname,lastname, username, email, password} = req.body;

  argon2
    .hash(password)
    .then(hash => {
      return db.users.insert(
        {
            username,
            email,
            firstname,
            lastname,
            password: hash,
          
        },
        {
          deepInsert: true,
          fields: ['id', 'username', 'email','firstname','lastname'],
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
function login(req, res) {
  const db = req.app.get('db');
  const { username, password } = req.body;
  db.users
    .findOne(
      {
        username,
      },
      {
        fields: ['id', 'username', 'password'],
      }
    )
    .then(user => {
      if (!user) {
        throw new Error('Incorrect Username');
      }
      return argon2.verify(user.password, password).then(valid => {
        if (!valid) {
          throw new Error('Incorrect Password');
        }
        const token = jwt.sign({ userid: user.id }, secret);
        delete user.password;
        res.status(200).json({ ...user, token });
      });
    })
    .catch(err => {
      if (
        ['Incorrect Username', 'Incorrect Password'].includes(err.message)
      ) {
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
