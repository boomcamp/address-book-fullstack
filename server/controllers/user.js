const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

module.exports = {
  signup: (req, res) => {
    const db = req.app.get('db');
    const { username, password } = req.body;

    argon2
      .hash(password)
      .then( hash => {
        return db.user.insert({
          username, 
          password: hash, 
        },{
          fields: ['userID', 'username']
        });
      })
      .then(user => {
        const token = jwt.sign({id: user.userID}, secret);
        res.status(201).send({ ...user, token});
      })
      .catch( error => {
        console.error(error);
        res.status(500).end();
      })

  }
}