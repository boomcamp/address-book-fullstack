const argon2 = require('argon2');
const secret = require('../../secret.js');
const jwt = require('jsonwebtoken');

module.exports = {
    createUsers: (req, res) => {
        const db = req.app.get('db');
        const { fname, lname, username, email, password } = req.body;

        argon2
            .hash(password)
            .then(hash=>{
                return db.users.insert({
                    fname,
                    lname,
                    username,
                    email,
                    password: hash,
                },{
                    fields: ['id', 'fname', 'lname', 'username', 'email', 'password']
                });
            })
            .then(user=>{
                const token = jwt.sign({ userId: user.id }, secret)
                res.status(200).json({ ...user, token})
            })
            .catch(err =>{
                console.error(err)
                res.status(500).end()
            })
    },
    login:(req, res) => {
        const db = req.app.get('db');
        const { username, password } = req.body;

        db.users
            .findOne({
                username
            },{
                fields: ['id', 'username', 'password'],
            })
            .then(user => {
                if(!user){
                    throw new Error('Invalid or No Existing Username')
                }
                return argon2.verify(user.password, password)
                .then(valid=>{
                    if(!valid){
                        throw new Error('Invalid Password')
                    }

                    const token = jwt.sign({ userId: user.id }, secret)
                    // delete user.password;
                    res.status(200).json({ ...user, token })
                })
            })
            .catch(err =>{
                if(['Invalid username', 'Incorrect password'].includes(err.message)){
                    res.status(400).json({ error: err.message})
                }else{
                    console.log(err)
                    res.status(500).end()
                }
            })
    },
    getUsers: (req, res) => {
        const db = req.app.get('db')

        db.users
        .find()
        .then(u => res.status(200).json(u))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
    },
    getUser: (req, res) => {
        const db = req.app.get('db')

        db.users
        .findOne(req.params.id)
        .then(user => res.status(201).json(user))
        .catch(err =>{
            console.err(err)
            res.status(500).end()
        })
    },
    createContact:(req, res) => {
        const db = req.app.get('db')
        const { 
            userId,
            f_name, 
            l_name, 
            home_phone, 
            mobile_phone, 
            work_phone, 
            email, 
            city, 
            state_or_province, 
            postal_code,
            country } = req.body;

        db.contacts
        .save({
            userId,
            f_name, 
            l_name, 
            home_phone, 
            mobile_phone, 
            work_phone, 
            email, 
            city, 
            state_or_province, 
            postal_code,
            country
        })
        .then(u => res.status(200).json(u))
        .catch(err =>{
            console.error(err)
            res.status(500).end()
        })
    },
    getContacts: (req, res) => {
        const db = req.app.get('db')

        db.contacts
        .find()
        .then(u => res.status(200).json(u))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
    },
    getContact: (req, res) => {
        const db = req.app.get('db')

        db.contacts
        .findOne(req.params.id)
        .then(u => res.status(201).json(u))
        .catch(err =>{
            console.err(err)
            res.status(500).end()
        })
    },
    updateContact: (req, res) => {
        const db = req.app.get('db')
        const { f_name, 
            l_name, 
            home_phone, 
            mobile_phone, 
            work_phone, 
            email, 
            city, 
            state_or_province, 
            postal_code,
            country } = req.body

        db.contacts
        .update(req.params.id, {
            f_name: f_name, 
            l_name: l_name, 
            home_phone: home_phone, 
            mobile_phone: mobile_phone, 
            work_phone: work_phone, 
            email: email, 
            city: city, 
            state_or_province: state_or_province, 
            postal_code: postal_code,
            country: country
        })
        .then(u => res.status(201).json(u))
        .catch(err =>{
            console.err(err)
            res.status(500).end()
        })
    },
    deleteContact: (req, res) => {
        const db = req.app.get('db')

        db.contacts
        .destroy(req.params.id)
        .then(u => res.status(201).json(u))
        .catch(err =>{
            console.err(err)
            res.status(500).end()
        })
    },
    addAddress: (req, res) => {
        const db = req.app.get('db')
        const { userId, country, region, province, city } = req.body

        db.address
        .save({
            userId, country, region, province, city
        })
        .then(u => res.status(200).json(u))
        .catch(err =>{
            console.error(err)
            res.status(500).end()
        })
    },
    getAdrress: (req, res) => {
        const db = req.app.get('db')

        db.address
        .find({ userId: req.params.id })
        .then(u => res.status(201).json(u))
        .catch(err =>{
            console.err(err)
            res.status(500).end()
        })
    },
    updateAddress: (req, res) => {
        const db = req.app.get('db')
        const { country, region, province, city } = req.body

        db.address
        .update({userId: req.params.id},{
            country, region, province, city
        })
        .then(u => res.status(201).json(u))
        .catch(err =>{
            console.err(err)
            res.status(500).end()
        })
    }
}