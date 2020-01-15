function createContact(req, res) {
  const db = req.app.get("db");

  const {
    id,
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
  } = req.body;
  // console.log(req.body);
  db.contacts
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
        country,

        address_book: [
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
    .then(data => res.status(201).json(data))
    .catch(err => {
      console.error(err);
    });
}
function getById(req, res) {
  const db = req.app.get("db");

  db.contacts
    .findOne(req.params.id)
    .then(contact => res.status(200).json(contact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function contactList(req, res) {
  const db = req.app.get("db");
  const userId = req.params.id;
  const sort = req.query.sort;
  const groups = req.query.groups;

  if (groups == undefined) {
    // console.log(sort);
    db.query(
      `select * from contacts INNER JOIN address_book on contacts.id = address_book.contactid where address_book.userid = ${userId} ORDER BY last_name `,
      []
    ).then(data => {
      res.status(200).json(data);
    });
  } else {
    db.query(
      `select * from contacts INNER JOIN address_book on contacts.id = address_book.contactid where address_book.userid = ${userId} and address_book.groupid = ${groups}`
    ).then(data => {
      res.status(200).json(data);
    });
  }
}
// function deleteContact(req, res) {
//   const db = req.app.get('db');

//   const id = req.params.id;
//   db.contacts
//     .destroy({
//       id
//     }).then(contact => { res.status(200).json(contacts);
//     }).catch(err => { res.status(500).end();
//     })
// }

function deleteContact(req, res) {
  const db = req.app.get("db");
  const id = req.params.id;

  db.query(
    `
  DELETE from address_book where contactid = ${id}`
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
function updateContact(req, res) {
  const db = req.app.get('db')
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
      country

  } = req.body

    db.contacts
    .update(req.params.id, {
      first_name: first_name,
      last_name: last_name,
      home_phone: home_phone,
      mobile_phone: mobile_phone,
      work_phone: work_phone,
      email: email,
      city: city,
      state_or_province: state_or_province,
      postal_code: postal_code,
      country: country
    })
    .then(item => res.status(200).json(item))
}
module.exports = {
  createContact,
  getById,
  contactList,
  deleteContact,
  updateContact
};
