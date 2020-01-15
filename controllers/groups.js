module.exports = {
  groupsByUser: (req, res) => {
    const db = req.app.get("db");

    db.groups
      .find({ user_id: req.params.id })
      .then(groups => res.status(200).json(groups))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  contactsByGroup: (req, res) => {
    const db = req.app.get("db");

    db.contacts
      .find({ group_id: req.params.id })
      .then(groups => res.status(200).send({ allContacts: groups }))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  createGroup: (req, res) => {
    const db = req.app.get("db");
    db.groups
      .insert(req.body, {
        fields: ["id", "user_id", "group_name"]
      })
      .then(groups => res.status(200).json(groups))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  addToGroup: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .update({ id: req.params.id }, req.body)
      .then(group => res.status(200).json(group))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
