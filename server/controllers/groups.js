module.exports = {
  listGroups: (req, res) => {
    const db = req.app.get("db");
    const { userID, order } = req.params;
    
    db.query(`SELECT * FROM groups WHERE "userID" = ${userID} ORDER BY "groupName" ${order}`)
    .then(groups => res.status(200).send(groups))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  addGroup: (req, res) => {
    const db = req.app.get("db");
    const { groupName } = req.body;
    const { userID } = req.params;

    db.groups
    .insert({
      groupName,
      userID
    })
    .then(group => res.status(201).send(contact))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  editGroup: (req, res) => {
    const db = req.app.get("db");
    const { groupName } = req.body;
    const { id } = req.params;

    db.groups
    .update({
      groupID: id
    },{
      groupName
    })
    .then(group => res.status(200).send(group))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  deleteGroup: (req, res) => {
    const db = req.app.get("db");
    const { groupID } = req.params;

    db.groups
    .destroy({
      groupID
    })
    .then( () => res.status(200).send("Group Deleted"))
    .catch( error => {
      console.error(error);
      res.status(500).end();
    })
  },
  addMembers: (req, res) => {
    const db = req.app.get("db");

  },
  deleteMember: (req, res) => {
    const db = req.app.get("db");
  },
}