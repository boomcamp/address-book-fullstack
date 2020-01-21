function addGroup(req, res) {
  const db = req.app.get("db");
  const { groupname, icon } = req.body;
  const { userid } = req.params;
  db.groupcontacts
    .insert({
      userid,
      groupname,
      icon
    })
    .then(group => res.status(200).send(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function getGroupsByUser(req, res) {
  const db = req.app.get("db");
  const { userid } = req.params;

  db.groupcontacts
    .find({ userid: userid })
    .then(group => res.status(200).send(group))
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
        .then(group => res.status(201).send(group))
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
  const { groupname, icon } = req.body;
  db.groupcontacts
    .save({
      id: groupid,
      groupname,
      icon
    })
    .then(group => res.status(200).send(group))
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
