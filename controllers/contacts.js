module.exports = {
  allContacts: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .find()
      .then(contacts => res.status(200).json(contacts))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
