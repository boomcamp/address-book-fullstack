module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { userId, groupName } = req.body;
    db.groups
      .findOne({ groupName })
      .then(data => {
        if (data) {
          throw new Error("Existing group name");
        }
        return db.groups
          .insert({
            userId,
            groupName
          })
          .then(group => res.status(200).json(group))
          .catch(() => res.status(500).end);
      })
      .catch(err => {
        if ("Existing group name".includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  },
  list: (req, res) => {
    const db = req.app.get("db");
    db.groups
      .find({ userId: req.params.id })
      .then(group => res.status(200).json({ groups: group }))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  add: (req, res) => {
    const db = req.app.get("db");
    const { groupId } = req.body;
    db.contacts
      .findOne({ id: req.params.id })
      .then(data => {
        return db.grouplist
          .insert({
            groupId,
            contactId: data.id
          })
          .then(grouplist => res.status(200).json(grouplist))
          .catch(() => res.status(500).end());
      })
      .catch(() => res.status(500).end());
  }
};
