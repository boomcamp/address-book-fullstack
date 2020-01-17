module.exports = {
  addGroups: (req, res) => {
    const db = req.app.get("db");

    const { user_id, group_name } = req.body;

    db.groups
      .insert(
        {
          user_id,
          group_name
        },
        {
          deepInsert: true
        }
      )
      .then(group => res.status(201).json(group))
      .catch(err => {
        console.error(err);
      });
  },
  listGroups: (req, res) => {
    const db = req.app.get("db");

    db.groups
      .find()
      .then(groups => res.status(200).json(groups))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  deleteGroup: (req, res) => {
    const db = req.app.get("db");

    db.groups
      .destroy({ id: req.params.id })
      .then(group => res.status(200).json(group))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  editGroup: (req, res) => {
    const db = req.app.get("db");

    db.groups
      .update({ id: req.params.id }, req.body)
      .then(group => res.status(200).json(group))
      .catch(err => {
        console.error(err);
      });
  }
};
