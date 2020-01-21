function addGroup(req, res) {
  const db = req.app.get("db");
  const { groupname } = req.body;
  const { userid } = req.params;
  db.groupcontacts
    .insert({
      userid,
      groupname
    })
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
    });
}
function getGroupsByUser(req, res) {
  const db = req.app.get("db");
  const { userid } = req.params;

  db.groupcontacts
    .find({ userid: userid })
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function deleteGroup(req, res) {
  const db = req.app.get("db");
  const { groupid } = req.params;
  db.groupcontacts
    .destroy({ id: groupid })
    .then(group => {
      res.status(200).json(group);
      db.groupmember
        .destroy({ groupid })
        .then(group => res.status(201).json(group))
        .catch(err => {
          console.error(err);
          res.status(500).end();
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function updateGroupName(req, res) {
  const db = req.app.get("db");
  const { groupid } = req.params;
  const { groupname } = req.body;
  db.groupcontacts
    .save({
      id: groupid,
      groupname
    })
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
module.exports = {
  addGroup,
  getGroupsByUser,
  deleteGroup,
  updateGroupName
};
