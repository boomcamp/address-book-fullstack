function create(req, res) {
  const db = req.app.get("db");

  const { groupname } = req.body;
  const { userid } = req.params;

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
