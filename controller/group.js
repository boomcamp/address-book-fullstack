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
          fields: ["group_id", "user_id", "group_name"]
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
  },
  addToGroup: (req, res) => {
    const db = req.app.get("db");
    const contact = req.body;
    const id = req.params.id;

    db.contacts
      .update(id, contact)
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        res.status(500).end();
      });
  },
  editGroup: (req, res) => {
    const db = req.app.get("db");
    const group = req.body;
    const id = req.params.id;

    db.groups
      .update(id, group)
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  deleteGroup: (req, res) => {
    const db = req.app.get("db");
    const group = req.body;
    const id = req.params.id;

    db.groups
      .destroy(id, group)
      .then(post => res.status(200).json(post))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  }
};
