// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
// const secret = require('../../secret')

module.exports = {
    list: (req, res) => {
        const db = req.app.get('db');
        const {userId} = req.query;

        db.group_contact
        .find({ userid: userId})
        .then(user => {
            user.map(x => {
                if(x.userid == userId){
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
            })
        })
    },

    contactList: (req, res) => {
        const db = req.app.get('db')
        
        db.contacts
        .find({ groupId: req.params.id})
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
        .update( {id: req.params.id}, {groupId: null} )
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
        .find({groupId: req.params.id})
        .then(contact => {
            if(contact){
                contact.map(x => {
                    db.contacts
                    .update({id: x.id}, {groupId: null})
                    .then(contact => { 
                        // res.status(200).json(contact) 
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).end();
                    })
                })
            }
            
            db.group_contact
            .destroy({ id: req.params.id })
            .then(group => {
                db.group_contact.find().then(group => { res.status(200).json(group) })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).end();
        })
    },

    updateGroup: (req, res) => {
        const db = req.app.get('db');
        const {groupName} = req.body

        db.group_contact
        .update({id: req.params.id}, {groupName})
        .then(group => {
            db.group_contact.find().then(group => res.status(200).json(group))
        })
        .catch(err => {
            console.log(err)
            res.status(500).end();
        })
    }

}