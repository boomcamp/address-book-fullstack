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
                fields: ['user_id', 'username', 'password', 'email'],
                deepInsert: true
            });
        })
        .then(user => {
            const token = jwt.sign({ user_id: user.id }, secret);
            res.status(201).json({ ...user, token });
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function getAllData(req, res) {
    const db = req.app.get('db');

    db.users
        .find()
        .then(users => res.status(200).json(users))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

function getDataById(req, res) {
    const db = req.app.get('db');
    const { user_id } = req.params.id;

    db.users
        .findOne(user_id)
        .then(user => res.status(200).json(user))
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

module.exports = {
    newUser, getAllData, getDataById
}