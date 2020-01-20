function create(req, res) {
  const db = req.app.get("db");

  const { groupname, userid } = req.body;

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

function addMember(req, res) {
  const db = req.app.get("db");

  const { contactid, groupid } = req.body;

  db.groupmembers
    .insert({
      groupid,
      contactid
    })
    .then(member => res.status(200).json(member))
    .catch(err => {
      res.status(500).end();
      console.error(err);
    });
}

function getGroups(req, res) {
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
    .then(groupcontacts => res.status(200).json(groupcontacts))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function updateGroupContact(req, res) {
  const db = req.app.get("db");
  const { groupid } = req.params;
  const { groupname } = req.body;
  db.groupcontacts
    .save({
      id: groupid,
      groupname
    })
    .then(groupcontact => res.status(200).json(groupcontact))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
``;

function getContactGroups(req, res) {
  const db = req.app.get("db");
  const { contactid } = req.params;
  db.query(
    `select groupcontacts.id, userid, groupname from groupmembers INNER JOIN groupcontacts ON groupmembers.groupid = groupcontacts.id where contactid=${contactid};`
  )
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function getContactGroupMembers(req, res) {
  const db = req.app.get("db");
  const { groupid } = req.params;
  db.query(
    `select * from contacts inner join groupmembers on contacts.id = groupmembers.contactid where groupid =${groupid};`
  )
    .then(members => res.status(201).json(members))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function deleteGroupMember(req, res) {
  const db = req.app.get("db");
  const { contactid } = req.params;

  db.groupmembers
    .destroy({ contactid: contactid })
    .then(member => res.status(200).json(member))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  create,
  getGroups,
  deleteGroup,
  updateGroupContact,
  addMember,
  getContactGroups,
  getContactGroupMembers,
  deleteGroupMember
};
