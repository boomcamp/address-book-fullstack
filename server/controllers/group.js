// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
// const secret = require('../../secret')

module.exports = {
    list: (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.query;

        db.query(`SELECT * from group_contact WHERE group_contact.userid = ${userId}`)
        .then(group => {
            res.status(200).json(group)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
    },

    contactList: (req, res) => {
        const db = req.app.get('db')
        const {sortLastname} = req.query

        db.query(`SELECT * FROM group_contact, contacts WHERE contacts.groupid = ${req.params.id} AND group_contact.id = contacts.groupid ${(sortLastname)?`ORDER BY last_name ${sortLastname}`: ''}`)
        .then(group => {
            res.status(200).json(group)
        })
        .catch(err => {
            console.log(err)
            res.status(500).end();
        })
    },

    removeContact: (req, res) => {
        const db = req.app.get('db');

        db.contacts
        .update( {id: req.params.id}, {groupid: null} )
        .then(contact => {
            res.status(200).json(contact)
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
    },

    deleteGroup: (req, res) => {
        const db = req.app.get('db')

        db.contacts
        .find({groupid: req.params.id})
        .then(contact => {
            if(contact){
                contact.map(x => {
                    db.contacts
                    .update({id: x.id}, {groupid: null})
                    .then(contact => { 
                        // res.status(200).json(contact) 
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).end();
                    })
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })

        setTimeout(() => {
            db.group_contact
            .destroy({ id: req.params.id })
            .then(group => {
                db.group_contact.find().then(group => { res.status(200).json(group) })
            })
            .catch(err => {
                console.log(err);
                res.status(500).end();
            })
        }, 600)
    },

    updateGroup: (req, res) => {
        const db = req.app.get('db');
        const {group_name} = req.body

        db.group_contact
        .update({id: req.params.id}, {group_name})
        .then(group => {
            db.group_contact.find().then(group => res.status(200).json(group))
        })
        .catch(err => {
            console.log(err)
            res.status(500).end();
        })
    },
}