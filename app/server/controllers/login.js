const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret');

function login(req, res) {
    const db = req.app.get('db');

    const { username, password } = req.body;

    db.users
        .findOne({
            username,
        }, {
            fields: ['user_id', 'username', 'password', 'email']
        })
        .then(async user => {
            if (!user) {
                throw new Error('Invalid Username');
            }
            const valid = await argon2.verify(user.password, password);
            if (!valid) {
                throw new Error('Incorrect Password');
            }
            const token = jwt.sign({ user_id: user.id }, secret);
            delete user.password;
            res.status(200).json({ ...user, token });
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

module.exports = {
    login
}