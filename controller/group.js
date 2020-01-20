module.exports = {
  addgroup: (req, res) => {
    const db = req.app.get("db");
    const { user_id, group_name } = req.body;

    db.groups
      .insert(
        {
          user_id,
          group_name
        },
        {
          fields: ["id", "user_id", "group", "group_name"]
        }
      )
      .then(group => {
        res.status(201).json({ group });
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  groupList: (req, res) => {
    const db = req.app.get("db");
    db.groups
      .find({ user_id: req.params.id })
      .then(users => res.status(200).json(users))
      .catch(err => {
        res.status(500).end();
      });
  }
};
