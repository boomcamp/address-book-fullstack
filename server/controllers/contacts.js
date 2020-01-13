// const argon2 = require('argon2');
// const jwt = require('jsonwebtoken');
// const secret = require('../../secret')

module.exports = {
    create: (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country} = req.body

            db.contacts
            .save({
                userId: req.params.id, firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country
            })
            .then(user => res.status(201).json(user))
            .catch(err => {
                console.log(user)
                res.status(500).end()
            })
    },

    list: (req, res) => {
        const db = req.app.get('db');

        db.users
        .findOne({
            id: req.params.id,
        })
        .then(user => {
            db.contacts
            .find({userId: user.id})
            .then(contact => {
                res.status(200).json(contact)
            })
            .catch(err => {
                console.log(err)
                res.status(500).end()
            })    
        })
        .catch(err => {
            console.log(err)
            res.status(500).end()
        })
    },

    delete: (req, res) => {
        const db = req.app.get('db');

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
    },

    update: (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, homePhone, mobilePhone, workPhone, email, city, stateProvince, postalCode, country} = req.body
        
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
    }
}