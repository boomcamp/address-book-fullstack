const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret')

function newUser(req, res) {
    const db = req.app.get('db');
    const { email, username, password, firstname, lastname } = req.body;

    argon2
        .hash(password)
        .then(hash => {
            return db.users
                .insert(
                    {
                        email,
                        username,
                        password: hash,
                        firstname,
                        lastname
                    },
                    {
                        fields: ['user_id', 'username', 'email', 'firstname', 'lastname'],
                    }
                );
        })
        .then(user => {
            const token = jwt.sign({ user_id: user.user_id }, secret); // adding token generation
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
                    const token = jwt.sign({ user_id: user.user_id }, secret);
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

function getUsersByID(req, res) {
    const db = req.app.get('db');
    const { user_id } = req.params;

    db.users
        .findOne({ user_id })
        .then(user => res.status(200).json(user))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}

function updateUser(req, res) {
    const db = req.app.get("db");
    const {
        firstname,
        lastname,
    } = req.body;
    const { user_id } = req.params

    db.contacts
        .update(
            {
                user_id
            },
            {
                firstname,
                lastname,
            }
        )
        .then(update => res.status(201).send(update))
        .catch(e => {
            console.err(e);
            res.status(500).end();
        });
}

function deleteUser(req, res) {
    const db = req.app.get('db');
    const { user_id } = req.params

    db.contact
        .destroy({ user_id })
        .then(() => {
            res.status(200).send('Contact Deleted')
        })
        .catch(e => {
            console.error(e);
            res.status(500).end();
        })
}

module.exports = {
    newUser, login, getUsersByID, updateUser, deleteUser
}