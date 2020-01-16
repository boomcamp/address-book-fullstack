module.exports = {
  addcontact: (req, res) => {
    const db = req.app.get("db");
    const id = req.body.id;
    const {
      lastname,
      firstname,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      stae_or_province,
      postal_code,
      country,
      userid
    } = req.body;
    console.log(id);
    db.contact_info
      .insert({
        lastname,
        firstname,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        stae_or_province,
        postal_code,
        country,
        userid
      })

      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  allcontacts: (req, res) => {
    const db = req.app.get("db");
    const uid = req.params.id;
    console.log(uid);
    db.query(
      `select * from contact_info where userid = ${uid} ORDER BY lastname `
    ).then(data => {
      res.status(200).json(data);
    });
    // .find()
    // .then(users => res.status(200).json(users))
    // .catch(err => {
    //   console.error(err);
    //   res.status(500).end();
    // });
  },
  update: (req, res) => {
    const db = req.app.get("db");
    const id = req.body.id;
    const {
      lastname,
      firstname,
      home_phone,
      mobile_phone,
      work_phone,
      email,
      city,
      stae_or_province,
      postal_code,
      country,
     
    } = req.body;
    console.log(id);
    db.contact_info
      .update(req.params.id,{
        lastname:lastname,
        firstname:firstname,
        home_phone:home_phone,
        mobile_phone:mobile_phone,
        work_phone:work_phone,
        email:email,
        city:city,
        stae_or_province:stae_or_province,
        postal_code:postal_code,
        country:country,
      
      })

      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const id = req.params.id;
    db.query(
      `
    DELETE from contact_info where id = ${id}`
    )
      .then(() => {
        db.query(` DELETE from contact_info where id = ${id}`);
      })
      .then(response => {
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).end();
      });
  }
};
