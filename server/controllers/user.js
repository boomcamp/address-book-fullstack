const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret');


module.exports = {
  signup: (req, res) => {
    const db = req.app.get('db');
    const { username, password, firstname, lastname } = req.body;

    argon2
      .hash(password)
      .then( hash => {
        return db.users.insert(
          {
            username,
            password: hash,
            contacts: [{
              userID: undefined,	  
              user_firstName: firstname,
              user_lastName: lastname,
              user_home_phone: null,
              user_mobile_phone: null,
              user_work_phone: null,
              user_email: null,
              user_city: null, 
              user_state: null,
              user_country: null,
              user_postal_code: null
            }]
          },{
            deepInsert: true,
          },{
            fields: ['id', 'username'],
          }
        );
      })
        .then(user => {
          const token = jwt.sign({ userID: user.id }, secret);
          res.status(201).json({ ...user, token });
        })
        .catch(error => {
          console.error(error);
          res.status(500).end();
        })

  },
  login: (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;
    let loginTimestamp = new Date().getTime();

    db.users
      .findOne({
        username
      },{
        fields: ['userID', 'username', 'password', 'last_login_time']
      })
      .then(user => {
        if(!user) {
          throw new Error('User not found! Please try again.');
        }

        return argon2.verify(user.password, password).then(valid => {
          if (!valid) {
            throw new Error('Incorrect password! Please try again.');
          }
          db.users.update(
            { userID: user.userID },
            { last_login_time: loginTimestamp }
          ).then(updated => {
            const token = jwt.sign({ userID: updated.userID }, secret);
            delete updated[0].password;
            res.status(200).send({ ...updated[0], token });
          })
          // const token = jwt.sign({ userID: user.userID }, secret);
          // delete user.password;
          // res.status(200).send({ ...user, token });
        });
      })
  }
}