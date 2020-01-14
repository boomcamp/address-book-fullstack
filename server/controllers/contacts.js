// const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret')

module.exports = {
    create: (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country, groupAdd, groupName} = req.body
        
        if (!req.headers.authorization) 
            return res.status(401).end();        

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            if(groupAdd){
                db.group_contact
                .findOne(
                    {
                        groupName 
                    },
                    {
                        fields:  ['id', 'groupName']
                    }
                )
                .then(group => {
                    if(group){
                        db.contacts
                        .save({
                            userId: req.params.id, groupId: group.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
                        })
                        .then(contact => res.status(201).json(contact))
                        .catch(err => {
                            console.log(err)
                            res.status(500).end()
                        })
                    }

                    if(!group){
                        db.group_contact
                        .save({ groupName })
                        .then(group => {
                            db.contacts
                            .save({
                                userId: req.params.id, groupId: group.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
                            })
                            .then(contact => res.status(201).json(contact))
                            .catch(err => {
                                console.log(err)
                                res.status(500).end()
                            })
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).end()
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).end()
                })
            }   
         
            if(!groupAdd){
                db.contacts
                .save({
                    userId: req.params.id, groupId: null, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
                })
                .then(contact => res.status(201).json(contact))
                .catch(err => {
                    console.log(err)
                    res.status(500).end()
                })
            }
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    },

    list: (req, res) => {
        const db = req.app.get('db');

        if (!req.headers.authorization) 
            return res.status(401).end();        

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret); 

            db.users
            .findOne({
                id: req.params.id,
            })
            .then(user => {
                if(user){
                    db.contacts
                    .find({userId: user.id})
                    .then(contact => {
                        res.status(200).json(contact)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).end()
                    })
                }
            })
            .catch(err => {
                console.log(err)
                res.status(500).end()
            })
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    },

    delete: (req, res) => {
        const db = req.app.get('db');

        if (!req.headers.authorization) 
            return res.status(401).end();

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            db.contacts
            .destroy({
                id: req.params.id
            })
            .then(contact => {
                res.status(200).json(contact)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    },

    update: (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country} = req.body
        
        if (!req.headers.authorization) 
            return res.status(401).end();
        
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            db.contacts
            .update(
                {id: req.params.id}, {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country}
            )
            .then(contact => {
                res.status(200).json(contact)
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    },

    group: (req, res) => {
        const db = req.app.get('db');

        db.group_contact
        .find()
        .then(group => {
            res.status(200).json(group)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })

    }
}