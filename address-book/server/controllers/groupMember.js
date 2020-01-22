function addGroupMember(req, res) {
  const db = req.app.get("db");
  const { groupid, contactid } = req.body;
  db.groupmember
    .insert({
      groupid,
      contactid
    })
    .then(group => res.status(201).send(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function getAllGroupMember(req, res) {
  const db = req.app.get("db");

  db.groupmember
    .find()
    .then(group => res.status(200).send(group))
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
    .then(group => res.status(201).send(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getGroupMembers(req, res) {
  const db = req.app.get("db");
  const { groupid } = req.params;

  db.query(
    `select contacts.* from groupmember INNER JOIN contacts ON groupmember.contactid = contacts.id where groupid=${groupid};`
  )
    .then(group => res.status(201).send(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteGroupMember(req, res) {
  const db = req.app.get("db");
  const { contactid } = req.params;

  db.groupmember
    .destroy({ contactid })
    .then(group => res.status(201).send(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  addGroupMember,
  getAllGroupMember,
  getContactGroups,
  deleteGroupMember,
  getGroupMembers
};
