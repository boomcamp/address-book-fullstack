const secret = require("../../secret.js");
function group(req, res) {
  const db = req.app.get("db");

  const { userid, groupname } = req.body;

  db.groups
    .insert({
      userid,
      groupname
    })
    .then(group => res.status(201).json(group))
    .catch(err => {
      res.status(500).end();
    });
}

function getGroupById(req, res) {
  const db = req.app.get("db");
  db.groups
    .find({ userid: req.params.id })
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      res.status(500).end();
    });
}
function getGroupMemberById(req, res) {
  const db = req.app.get("db");
  const groupId = req.params.id;

  db.query(
    `select * from contacts inner join groupcontacts on contacts.id = groupcontacts.contactid where groupcontacts.groupid = ${groupId} ORDER BY firstname `,
    []
  ).then(data => {
    res.status(200).json(data);
  });
}
function updateGroupById(req, res) {
  const db = req.app.get("db");
  const id = req.params.id;
  const { groupname } = req.body;

  db.groups
    .update(
      {
        id: id
      },
      {
        groupname
      }
    )
    .then(group => res.status(201).json(group))
    .catch(err => {
      res.status(500).end();
    });
}
function getSelectedGroups(req, res) {
  const db = req.app.get("db");
  db.query(
    `SELECT id as id from groups WHERE userid = ${req.params.id}`
  ).then(gr => res.status(201).json(gr));
}
function getGroupContact(req, res) {
  const db = req.app.get("db");
  let arr = [];
  db.query(
    `SELECT groupid AS id from groupcontacts WHERE contactid = ${req.params.id}`
  )
    .then(grc => res.status(201).json(grc))
    .catch(err => console.log(err));
}
//deleteToGroups
function addtoGroup(req, res) {
  const db = req.app.get("db");
  const { groupid, contactid, userid } = req.body;
  db.groupcontacts
    .insert({ groupid, contactid, userid })
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      res.status(500).end();
    });
}

function newGroups(req, res) {
  const db = req.app.get("db");

  console.log(req.params.id);
  db.groups
    .find({ id: req.params.id })
    .then(gr => res.status(201).json(gr))
    .catch(err => console.log(err));
}
function deleteToGroups(req, res) {
  const db = req.app.get("db");
  const contact = req.params.contactid;
  const group = req.params.groupid;
  console.log(contact);
  db.query(
    `delete from groupcontacts where contactid = ${contact} and groupid = ${group}`
  )
    .then(response => {
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
    });
}
module.exports = {
  addtoGroup,
  updateGroupById,
  group,
  getGroupById,
  getGroupContact,
  getSelectedGroups,
  newGroups,
  getGroupMemberById,
  deleteToGroups
};
