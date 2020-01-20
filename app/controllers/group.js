function addgroup(req, res) {
  const db = req.app.get("db");
  const { group_name } = req.body;

  db.grouplist
    .insert({ group_name, userid: req.params.id })
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function grouplist(req, res) {
  const db = req.app.get("db");

  db.grouplist
    .find({ userid: req.params.id })
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

function addmembers(req, res) {
  const db = req.app.get("db");
  const { first_name, last_name } = req.body;

  db.grouplist
    .insert({ first_name, last_name, userid: req.params.id })
    .then(group => res.status(201).json(group))
    .catch(err => {
      console.error(err);
      res.status(500).end();
    });
}

module.exports = {
  addgroup,
  grouplist,
  addmembers
};
