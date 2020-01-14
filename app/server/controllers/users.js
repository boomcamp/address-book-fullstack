const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret');

function newUser(req, res) {
    const db = req.app.get('db');

    const { username, password, email } = req.body;

    argon2
        .hash(password)
        .then(hash => {
            return db.users.insert({
                username,
                password: hash,
                email
            }, {
                deepInsert: true
            })
        })
        .then(user => {
            const token = jwt.sign({ user_id: user.id }, secret);
            delete user.password;
            res.status(201).json({ ...user, token });
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function login(req, res) {
    const db = req.app.get('db');

    const { username, password } = req.body;

    db.users
        .findOne({
            username
        }, {
            fields: ['user_id', 'email', 'username', 'password']
        })
        .then(user => {
            if (!user) {
                throw new Error('Invalid Username');
            }

            return argon2
                .verify(user.password, password)
                .then(valid => {
                    if (!valid) {
                        throw new Error('Incorrect Password');
                    }

                    const token = jwt.sign({ user_id: user.id }, secret);
                    delete user.password;
                    res.status(200).json({ ...user, token })
                })
        })
        .catch(e => {
            if (['Invalid Username', 'Incorrect Password'].includes(e.message)) {
                res.status(400).json({ error: e.message });
            } else {
                console.error(e);
                res.status(500).end();
            }
        })
}

module.exports = {
    newUser, login
}