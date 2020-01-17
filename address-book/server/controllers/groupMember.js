function addGroupMember(req, res) {
  const db = req.app.get("db");
  const { groupid, contactid } = req.body;
  db.groupmember
    .insert({
      groupid,
      contactid
    })
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function getAllGroupMember(req, res) {
  const db = req.app.get("db");

  db.groupmember
    .find()
    .then(group => res.status(200).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getContactGroups(req, res) {
  const db = req.app.get("db");
  const { contactid } = req.params;

  db.query(
    `select groupcontacts.id, userid, groupname from groupmember INNER JOIN groupcontacts ON groupmember.groupid = groupcontacts.id where contactid=${contactid};`
  )
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  addGroupMember,
  getAllGroupMember,
  getContactGroups
};
