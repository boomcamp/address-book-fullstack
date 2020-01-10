const express = require('express');
const massive = require('massive');

massive({
  host: 'localhost',
  port: 5432,
  database: 'addressbook',
  user: 'postgres',
  password: '1234'
})
  .then(db => {
    const app = express();  
    app.set('db', db);
    app.use(express.json());

    const port = 3002;
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })

  })