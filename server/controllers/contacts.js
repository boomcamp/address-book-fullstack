const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../secret");

module.exports = {
  addContact: (req, res) => {
    const db = req.app.get("db");
    const { firstname, lastname, mobile_phone, work_phone, home_phone, email, city, state, postal_code, country } = req.body;
    const { userID } = req.params;

    db.address_book
    .insert({
      userID,
      groupID: null,
      ab_firstName: firstname,
      ab_lastName: lastname,
      ab_home_phone: home_phone,
      ab_mobile_phone: mobile_phone,
      ab_work_phone: work_phone,
      ab_email: email,
      ab_city: city,
      ab_state: state,
      ab_postal_code: postal_code,
      ab_country: country
    })
    .then(contact => {
      res.status(201).send(contact);
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  listContacts: (req, res) => {
    const db = req.app.get("db");
    const { userID, order } = req.params;

    // db.address_book
    // .find({ userID })
    db.query(`SELECT * FROM address_book where "userID" = ${userID} ORDER BY "ab_lastName" ${order}`)
    .then(contacts => {
      res.status(200).send(contacts)
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  updateContact: (req, res) => {
    const db = req.app.get("db");
    const { firstname, lastname, mobile_phone, work_phone, home_phone, email, city, state, postal_code, country } = req.body;
    const { id } = req.params;

    db.address_book
    .update({
      abID: id
    }, {
      ab_firstName: firstname,
      ab_lastName: lastname,
      ab_home_phone: home_phone,
      ab_mobile_phone: mobile_phone,
      ab_work_phone: work_phone,
      ab_email: email,
      ab_city: city,
      ab_state: state,
      ab_postal_code: postal_code,
      ab_country: country
    })
    .then(contact => res.status(200).send(contact))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  deleteContact: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.address_book
    .destroy({
      abID: id
    })
    .then(() => {
      res.status(200).send("Contact Deleted")
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  }
};