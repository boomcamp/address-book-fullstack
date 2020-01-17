const secret = require("../../secret.js");

function contact(req, res) {
  const db = req.app.get("db");
  const {
    firstname,
    lastname,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country
  } = req.body;

  db.contacts // heres the new stuff, using massive to actually query the database.
    .insert(
      {
        firstname,
        lastname,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country,
        addressbook: [
          {
            userid: req.body.id,
            contactid: undefined
          }
        ]
      },
      {
        deepInsert: true
      }
    )
    .then(contact => res.status(201).json(contact)) // returns a promise so we need to use .then
    .catch(err => {
      console.error(err); // if something happens we handle the error as well.
      res.status(500).end();
    });
}

function getContactById(req, res) {
  const db = req.app.get("db");
  const usersId = req.params.id;
  const sort = req.query.sort;
  const groups = req.query.groups;
  if (groups == undefined) {
    db.query(
      `select * from contacts INNER JOIN addressbook on contacts.id = addressbook.contactid where addressbook.userid = ${usersId} ORDER BY firstname `,
      []
    ).then(data => {
      res.status(200).json(data);
    });
  } else {
    db.query(
      `select * from contacts INNER JOIN addressbook on contacts.id = addressbook.contactid where addressbook.userid = ${usersId} and addressbook.groupid = ${groups}`
    ).then(data => {
      res.status(200).json(data);
    });
  }
}
function deleteContactById(req, res) {
  const db = req.app.get("db");
  const id = req.params.id;
  db.query(
    `
  DELETE from addressbook where contactid = ${id}`
  )
    .then(() => {
      db.query(` DELETE from contacts where id = ${id}`);
    })
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      res.status(500).end();
    });
}
function updateContactById(req, res) {
  const db = req.app.get("db");
  const id = req.params.id;

  const {
    firstname,
    lastname,
    home_phone,
    mobile_phone,
    work_phone,
    email,
    city,
    state_or_province,
    postal_code,
    country
  } = req.body;

  db.contacts
    .update(
      {
        id: id
      },
      {
        firstname,
        lastname,
        home_phone,
        mobile_phone,
        work_phone,
        email,
        city,
        state_or_province,
        postal_code,
        country
      }
    )
    .then(contact => {
      res.status(200).json(contact);
    })
    .catch(err => {
      res.status(500).end();
    });
}
module.exports = {
  contact,
  getContactById,
  deleteContactById,
  updateContactById
};
