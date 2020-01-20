module.exports = {
  addgroup: (req, res) => {
    const db = req.app.get("db");
    const { id, userid, contactid, groupname } = req.body;
    console.log(id);
    db.groups
      .insert({
        userid,
        groupname
      })

      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
    },
  allgroups: (req, res) => {
    const db = req.app.get("db");
    const uid = req.params.id;
    console.log(uid);
    db.query(
      `select * from groups where userid = ${uid} ORDER BY groupname `
    ).then(data => {
      res.status(200).json(data);
    });
    // .find()
    // .then(users => res.status(200).json(users))
    // .catch(err => {
    //   console.error(err);
    //   res.status(500).end();
    // });
  }
}
