// const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret')

module.exports = {
    create: (req, res) => {
        const db = req.app.get('db');
        const {first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country, groupAdd, group_name, groupId} = req.body
        
        if (!req.headers.authorization) 
            return res.status(401).end();        

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            if(groupAdd){
                db.group_contact
                .findOne(
                    {
                        group_name 
                    },
                    {
                        fields:  ['id', 'group_name']
                    }
                )
                .then(group => {
                    if(group){
                        db.contacts
                        .save({
                            userid: req.params.id, groupid: group.id, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country,
                        })
                        .then(contact => res.status(201).json(contact))
                        .catch(err => {
                            console.log(err)
                            res.status(500).end()
                        })
                    }

                    if(!group){
                        db.group_contact
                        .save({ group_name, userid: req.params.id})
                        .then(group => {
                            db.contacts
                            .save({
                                userid: req.params.id, groupid: group.id, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country,
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
                    userid: req.params.id, groupid: null, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country,
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
                    userid: req.params.id, groupid: groupId, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country,
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
        const {sortLastname} = req.query

        if (!req.headers.authorization) 
            return res.status(401).end();        

        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret); 

            db.query(`SELECT * FROM contacts WHERE userid=${req.params.id} ${(sortLastname)?`ORDER BY last_name ${sortLastname}`:``}`)
            .then(contact => {
                res.status(200).json(contact)
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
        const {first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country, group_name} = req.body
        const {userId} = req.query
        
        if (!req.headers.authorization) 
            return res.status(401).end();
        
        try {
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, secret);

            if(group_name){
                db.group_contact
                .findOne( { group_name }, { fields:  ['id', 'group_name'] } )
                .then(group => {
                    if(group){
                        db.contacts
                        .update(
                            {id: req.params.id}, {groupid: group.id, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country}
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
                        .save({ group_name, userid: userId})
                        .then(group => {
                            db.contacts
                            .update(
                                {id: req.params.id}, {groupid: group.id, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country}
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
            else if(!group_name){
                db.contacts
                .update(
                    {id: req.params.id}, {groupid: null, first_name, last_name, home_phone, mobile_phone, work_phone, email, city, state_province, postal_code, country}
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
    },    
}