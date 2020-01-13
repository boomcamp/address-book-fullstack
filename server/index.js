const express = require('express')
const massive = require('massive')
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const cors = require('cors');
const users = require('./controllers/controllers.js');

massive({
    host: 'localhost',
    port: 5432,
    database: 'nodedb',
    user: 'postgres',
    password: 'nodedb'
}).then(db => {
    const app = express()
    app.set('db', db)
    app.use(express.json())
    app.use(cors())
    const port = 5001;

    app.post('/api/users', users.create);
    app.post('/api/login', users.login);
    app.get('/api/user/:id', users.getUser)
    app.get('/api/protected/data', 
        function(req, res){
            const db = req.app.get('db')

            if(!req.headers.authorization){
                return res.status(401).end();
            }

            try{
                const token = req.headers.authorization.split(' ')[1];
                jwt.verify(token, secret);
                // console.log(db.users)
                res.status(200).json({ data: 'here is the protected data.', token: token});
            }catch(err){
                console.error(err)
                res.status(500).end()
            }
    });
    app.get('/api/users', users.getUsers)

    app.listen(port, err=>{
        if(err){
            console.log(`Error Listening to Port ${port}`)
        }
        console.log(`Listening to Port ${port}`);
    })
}).catch(console.error);