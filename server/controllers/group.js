module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const { userid, groupname } = req.body;
    db.groups
      .findOne({ groupname })
      .then(data => {
        if (data) {
          throw new Error("Existing group name");
        }
        return db.groups
          .insert({
            userid,
            groupname
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
      .find({ userid: req.params.id })
      .then(group => res.status(200).json(group))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  add: (req, res) => {
    const db = req.app.get("db");
    const { groupid, contactid } = req.body;
    db.grouplist
      .findOne({ groupid, contactid })
      .then(data => {
        if (data) {
          throw new Error("Already added to Group");
        }
        return db.grouplist
          .insert({
            groupid,
            contactid
          })
          .then(list => res.status(200).json(list))
          .catch(() => res.status(500).end());
      })
      .catch(err => {
        if ("Already added to Group".includes(err.message)) {
          res.status(400).json({ error: err.message });
        } else {
          console.error(err);
          res.status(500).end();
        }
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    const { groupid, contactid } = req.params;
    db.grouplist
      .find({ groupid })
      .then(() => {
        return db
          .query(
            `delete from grouplist where groupid = ${groupid} and contactid = ${contactid}`
          )
          .then(data => res.status(200).json(data));
      })
      .catch(() => res.status(500).end());
  }
};
