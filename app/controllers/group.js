function addgroup(req, res) {
  const db = req.app.get("db");
  const { group_name } = req.body;

  db.contactgroup
    .insert({ group_name, userid: req.params.id })
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function grouplist(req, res) {
  const db = req.app.get("db");

  db.contactgroup
    .find()
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}
module.exports = {
  addgroup,
  grouplist
};
