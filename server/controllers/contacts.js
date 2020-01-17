// const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret')

module.exports = {
    create: (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country, groupAdd, groupName, groupId} = req.body
        
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
                            userid: req.params.id, groupid: group.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
                        })
                        .then(contact => res.status(201).json(contact))
                        .catch(err => {
                            console.log(err)
                            res.status(500).end()
                        })
                    }

                    if(!group){
                        db.group_contact
                        .save({ groupName, userid: req.params.id})
                        .then(group => {
                            db.contacts
                            .save({
                                userid: req.params.id, groupid: group.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
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
         
            else if(!groupAdd && !groupId){
                db.contacts
                .save({
                    userid: req.params.id, groupid: null, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
                })
                .then(contact => res.status(201).json(contact))
                .catch(err => {
                    console.log(err)
                    res.status(500).end()
                })
            }

            else if(groupId){
                db.contacts
                .save({
                    userid: req.params.id, groupid: groupId, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country,
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
                    .find({userid: user.id})
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
        const {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country, groupName} = req.body
        const {userId} = req.query
        
        if (!req.headers.authorization) 
            return res.status(401).end();
        
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            if(groupName){
                db.group_contact
                .findOne( { groupName }, { fields:  ['id', 'groupName'] } )
                .then(group => {
                    if(group){
                        db.contacts
                        .update(
                            {id: req.params.id}, {groupid: group.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country}
                        )
                        .then(contact => {
                            res.status(200).json(contact)
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).end();
                        })
                    }

                    if(!group){
                        db.group_contact
                        .save({ groupName, userid: userId})
                        .then(group => {
                            db.contacts
                            .update(
                                {id: req.params.id}, {groupid: group.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country}
                            )
                            .then(contact => {
                                res.status(200).json(contact)
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).end();
                            })
                        })
                    }
                })
            }
            else if(!groupName){
                db.contacts
                .update(
                    {id: req.params.id}, {groupid: null, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country}
                )
                .then(contact => {
                    res.status(200).json(contact)
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).end();
                })
            }
        } catch (err) {
            console.error(err);
            res.status(401).end();
        }
    }
}