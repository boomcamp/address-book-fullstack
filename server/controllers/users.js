const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret')

module.exports = {
    register: (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;
        
        db.users
        .findOne(
            {
                username
            },
            {
                fields: ['id', 'username']
            }
        ).then(user => {
            if(user)
                throw new Error('Username Already Exist');

            argon2
            .hash(password)
            .then(hash => {
                return db.users.insert(
                    {
                        username,
                        password: hash,
                    },
                    {
                        fields: ['id', 'username']
                    }
                );
            })
            .then(user => {
                const token = jwt.sign({userid: user.id}, secret);
                res.status(201).json({...user, token});
            })
            .catch(err => {
                console.log(err)
                res.status(500).end();
            });
        })
        .catch(err => {
            if (['Username Already Exist'].includes(err.message)) 
                res.status(400).json({ error: err.message });
            else {
              console.error(err);
              res.status(500).end();
            }
        });

       
    },

    login: (req, res) => {
        const db = req.app.get('db');
        const {username, password} = req.body;

        db.users
        .findOne(
            {
                username
            },
            {
                fields: ['id', 'username', 'password']
            }
        )
        .then(user => {
            if(!user)
                throw new Error('Invalid Username');

            return argon2.verify(user.password, password).then(valid => {
                if(!valid)
                    throw new Error('Incorrect Password');


                const token = jwt.sign({userid: user.id}, secret);
                delete user.password;
                res.status(200).json({...user, token});
            });
        })
        .catch(err => {
            if (['Invalid Username', 'Incorrect Password'].includes(err.message)) 
                res.status(400).json({ error: err.message });
            else {
              console.error(err);
              res.status(500).end();
            }
        });
    },

    fetch: (req, res) => {
        const db = req.app.get('db');

        if (!req.headers.authorization) 
            return res.status(401).end();        

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            db.users
            .findOne(
                {
                    id: req.params.id
                },
                {
                    fields: ['username']
                }
            )
            .then(user => res.status(200).json(user))
            .catch(err => {
                console.log(err)
                res.status(500).end()
            })
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    }
}