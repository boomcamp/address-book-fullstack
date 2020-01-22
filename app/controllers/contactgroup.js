function addmembers(req, res) {
  const db = req.app.get("db");
  const { groupid, contactid } = req.body;

  console.log(req.body);
  db.contactgroup
    .insert({
      userid: req.params.id,
      contactid,
      groupid
    })
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
function members(req, res) {
  const db = req.app.get("db");

  db.query(
    `select contactid  from contactgroup WHERE groupid=${req.query.gr_id} AND userid=${req.params.id} group by contactid 
    `
  )
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
    });
}
function memberdelete(req, res) {
  const db = req.app.get("db");

  db.query(`DELETE FROM contactgroup WHERE contactid=${req.params.id}`)
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  addmembers,
  members,
  memberdelete
};
