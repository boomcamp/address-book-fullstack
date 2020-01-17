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

  db.contacts
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
    .then(contacts => res.status(201).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function viewcontact(req, res) {
  const db = req.app.get("db");

  db.contacts
    .find({
      userId: req.params.id
    })
    .then(contacts => res.status(200).json(contacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function deletecontact(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  if (id) {
    db.contacts
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
    db.contacts
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
function contactlist(req, res) {
  const db = req.app.get("db");

  db.contacts
    .find({ userid: req.params.id })
    .then(user => res.status(200).json(user))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

function search(req, res) {
  const db = req.app.get("db");
  console.log(req.query.val);
  db.query(
    `select * from contacts where( userid=${req.params.id}) AND (first_name ilike '%${req.query.val}%' OR last_name ilike '%${req.query.val}%') `
  )
    .then(user => res.status(200).json(user))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}

module.exports = {
  addcontact,
  viewcontact,
  deletecontact,
  updatecontact,
  contactlist,
  search
};
