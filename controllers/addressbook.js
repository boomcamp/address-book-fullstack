module.exports = {
  fetchAddressBook: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .find({ user_id: req.params.id })
      .then(contacts => {
        db.groups.find({ user_id: req.params.id }).then(group => {
          group.map(x => {
            delete x.user_id;
            return x;
          });
          res.status(200).send({
            user_id: req.params.id,
            allContacts: contacts,
            allGroups: group
          });
        });
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
