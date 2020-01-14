const express = require('express');
const massive = require('massive');
const users = require('./controllers/user');
const cors =require('cors')


massive({
  host: 'localhost',
  port: 5432,
  database: 'addressbook',
  user: 'postgres',
  password: '1234'
})
  .then(db => {
    const app = express();  
    app.use(cors())
    app.set('db', db);
    app.use(express.json());

    //Register
    app.post('/api/signup', users.signup);
    //Sign-in
    app.post('/api/login', users.login);
    //get user 
    app.get('/api/user/:id', users.getUser);

    const port = 3002;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })

  })