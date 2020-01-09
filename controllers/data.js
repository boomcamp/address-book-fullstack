module.exports = {
  users: (req, res) => {
    const db = req.app.get("db");
    db.users.find().then(users => {
      res.status(200).send(users);
    });
  },
  contacts: (req, res) => {
    const db = req.app.get("db");
    db.contacts.find().then(contacts => {
      res.status(200).send(contacts);
    });
  }
};
