module.exports = {
  addgroup: (req, res) => {
    const db = req.app.get("db");
    const { id, userid, contactid, groupname } = req.body;
    // console.log(id);
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
  addtogroup: (req, res) => {
    const db = req.app.get("db");
    const { id, userid, contactid, groupid } = req.body;
    // console.log(id);
    db.addressbook
      .insert({
        userid,
        contactid,
        groupid
      })

      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  // sortallcontacts: (req, res) => {
  //   const db = req.app.get("db");
  //   const uid = req.params.id;
  //   const sort = req.params.sort
  //   console.log(uid);
  //   db.query(
  //     `select * from contact_info where userid = 37 ORDER BY lastname  ${sort}`
  //   ).then(data => {
  //     res.status(200).json(data);
  //   });
  // },
  updategrpName: (req, res) => {
    const db = req.app.get("db");
    const id = req.body.id;
    const { groupname } = req.body;
    // console.log(id);
    db.groups
      .update(req.params.id, {
        groupname: groupname
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
    // console.log(uid);
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
  },
  groupmembers: (req, res) => {
    const db = req.app.get("db");
    const uid = req.params.id;
    // console.log(uid);
    db.query(
      `select * from contact_info inner join addressbook on contact_info.id = addressbook.contactid where addressbook.groupid = ${uid} ORDER BY lastname`
    ).then(data => {
      res.status(200).json(data);
    });
  }
};
