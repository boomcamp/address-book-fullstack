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

  const { contactid } = req.body;
  const { groupid } = req.params;

  db.groupmembers
    .insert({
      id: groupid,
      contactid
    })
    .then(member => res.status(200).json(member))
    .catch(err => {
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

module.exports = {
  create,
  getGroups,
  deleteGroup,
  updateGroupContact,
  addMember
};
