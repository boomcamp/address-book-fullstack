function addcontact(req, res) {
  const db = req.app.get("db");

  const {
    first_name,
    last_name,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country,
    userid
  } = req.body;

  db.contact
<<<<<<< HEAD
    .insert({
      first_name,
      last_name,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      state_or_province,
      postal_code,
      country,
      userid
    })
=======
    .insert(
      {
        first_name,
        last_name,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country
      },
    )
>>>>>>> 1803b7cc9baddc6ba0316beb26b08a1c10b37de0
    .then(contacts => res.status(201).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
<<<<<<< HEAD
=======

>>>>>>> 1803b7cc9baddc6ba0316beb26b08a1c10b37de0
    });

 function viewcontact (req, res)  {
      const db = req.app.get('db');
    
      db.contact
        .find({
          userId: req.params.id
        })
        .then(contacts => res.status(200).json(contacts))
        .catch(err => {
          console.error(err);
          res.status(500).end();
        });
    };
}

function deletecontact(req, res){
  const db = req.app.get('db');
  const {id} = req.params

  if(id){
      db.contact.destroy({id})
      .then(list =>{
        res.status(201).json(list)
      })
      .catch(err=>{
        res.status(200).json({error: err.message})
        console.log(err);
        res.status(500).end()
      })

  }else{
    res.status(201).json("deleted")
  }
}

function updatecontact(req, res){
  const db = req.app.get('db');
  const {id} = req.params
  const { first_name,last_name,email,postal_code,city,
    state_or_province,country, home_phone, mobile_phone, work_phone} =req.body;


    if(id){
      db.contact.update({id: id},{
        first_name,last_name,email,postal_code,city,
        state_or_province,country, home_phone, mobile_phone, work_phone
      })
      .then(data =>{
        res.status(201).json(data)
    })
    .catch(err => {
      res.status(200).json({ error: err.message });
      console.error(err);
      res.status(500).end();
  })
}
else {
  res.status(201).json('Error') 
}
}
function viewcontact(req, res) {
  const db = req.app.get("db");

  db.contact
    .find({
      userId: req.params.id
    })
    .then(contacts => res.status(200).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function contactlist(req, res) {
  const db = req.app.get("db");

  db.contact
    .find({ userid: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

function deletecontact(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  if (id) {
    db.contact
      .destroy({ id })
      .then(list => {
        res.status(201).json(list);
      })
      .catch(err => {
        res.status(200).json({ error: err.message });
        console.log(err);
        res.status(500).end();
      });
  } else {
    res.status(201).json("deleted");
  }
}

function updatecontact(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;
  const {
    first_name,
    last_name,
    email,
    postal_code,
    city,
    state_or_province,
    country,
    home_phone,
    mobile_phone,
    work_phone
  } = req.body;

  if (id) {
    db.contact
      .update(
        { id: id },
        {
          first_name,
          last_name,
          email,
          postal_code,
          city,
          state_or_province,
          country,
          home_phone,
          mobile_phone,
          work_phone
        }
      )
      .then(data => {
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(200).json({ error: err.message });
        console.error(err);
        res.status(500).end();
      });
  } else {
    res.status(201).json("Error");
  }
}
module.exports = {
  addcontact,
  viewcontact,
  deletecontact,
<<<<<<< HEAD
  updatecontact,
  contactlist
=======
  updatecontact
>>>>>>> 1803b7cc9baddc6ba0316beb26b08a1c10b37de0
};
