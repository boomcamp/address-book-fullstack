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
module.exports = {
  addtoGroup,
  group,
  getGroupById
};
