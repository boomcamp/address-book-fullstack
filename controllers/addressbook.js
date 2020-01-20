module.exports = {
  fetchAddressBook: (req, res) => {
    const db = req.app.get("db");

    const { id } = req.params;
    const { sort } = req.query;

    db.query(
      `select * from contacts where user_id=${id} order by last_name ${sort} `,
      {
        id: id
      }
    )
      .then(contacts => {
        db.groups.find({ user_id: id }).then(group => {
          group.map(x => {
            delete x.user_id;
            return x;
          });
          res.status(200).send({
            user_id: id,
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
