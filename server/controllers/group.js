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
      .find()
      .then(group => res.status(200).json({ groups: group }))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
