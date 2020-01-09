function getUsersAddress(req, res) {
  const db = req.app.get("db");

  db.addressbook
    .find()
    .then(user => res.status(200).json(user))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    });
}
module.exports = {
  getUsersAddress
};
