function createGroup(req, res) {
  const db = req.app.get("db");

  const { userid, group_name } = req.body;

  db.groups
    .save({
      userid,
      group_name
    })
    .then(group => res.status(201).json(group))
    .catch(err => {
      res.status(500).end();
    });
}
function getGroups(req, res) {
  const db = req.app.get("db");

  db.groups
    .find({ userid: req.params.id })
    .then(groups => res.status(200).json(groups))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function addToGroup(req, res) {
  
  const db = req.app.get("db");

  const id = req.params.id;
  const userId = req.params.userid;
  const { groupid } = req.body;
  console.log('contact id',id);
  console.log('user id', userId)
  console.log(groupid)
  db.query(`Update address_book set groupid = ${groupid} where contactid = ${id} and userid = ${userId}`)
  .then(cont => res.status(200).json(cont))
    .catch(err => {
     res.status(500).end()
   })
}

function updateGroupById(req, res) {
  const db = req.app.get("db");
  const { group_name } = req.body;
  const id = req.params.id;
  const userId = req.params.userid;

  console.log(req.body);

  db.query(
    `Update groups set group_name = '${group_name}' where id = ${id} and userid = ${userId}`
  ).then(item => res.status(200).json(item));
}

function updateGroupIdToNull(req, res) {
  const db = req.app.get("db");
  const userId = req.params.userid;
  const groupId =req.params.groupid
  console.log(req.body);
  db.query(
    `Update address_book set groupid = null where userid = ${userId} and groupid = ${groupId}`
  ).then(item => res.status(200).json(item));
}
function deleteGroups(req, res) {
  const db = req.app.get("db");
  const userId = req.params.userid;
  const id =req.params.groupid
  db.query(
    `Delete From groups where userid=${userId} and id =${id}  `
  ).then(item => res.status(200).json(item));
}


module.exports = {
  createGroup,
  getGroups,
  addToGroup,
  updateGroupById,
  updateGroupIdToNull,
  deleteGroups
};
