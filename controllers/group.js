const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  add: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

      const db = req.app.get("db");

      const { group_name } = req.body;

      let group_date_created = new Date().toISOString().slice(0, 10);

      db.groups
        .save({
          group_name,
          group_date_created
        })
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err => {
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  },
  getAll: (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, secret);

      const db = req.app.get("db");

      db.groups
        .find()
        .then(post => {
          res.status(200).json(post);
        })
        .catch(err => {
          res.status(500).end();
        });
    } catch (err) {
      console.error(err);
      res.status(401).end();
    }
  },
  addReference: (req, res) => {
    // if (!req.headers.authorization) {
    //   return res.status(401).end();
    // }
    // const token = req.headers.authorization.split(" ")[1];

    // jwt.verify(token, secret);

    const db = req.app.get("db");

    const { group_name, contactid } = req.body;

    // group name is present

    db.groups
      .findOne({ group_name })
      .then(data => {

        // console.log()
        let contact_added_date = new Date().toISOString().slice(0, 10);

        db.groups_track
          .save({
            groupid: data.id,
            contactid,
            contact_added_date
          })
          .then(post => {
            res.status(201).json(post);
          })
          .catch(err => {
            res.status(500).end();
          });

        // res.status(200).json(data);
      })
      .catch(err => {
        // add new group name to table

        let group_date_created = new Date().toISOString().slice(0, 10);

        db.groups
          .save({
            group_name,
            group_date_created
          })
          .then(data => {

            db.groups_track
              .save({
                groupid: data.id,
                contactid,
                contact_added_date
              })
              .then(post => {
                res.status(201).json(post);
              })
              .catch(err => {
                res.status(500).end();
              });

            // res.status(201).json(post);
          }).then({})
          .catch(err => {
            res.status(500).end();
          });

        res.status(500).end();
      });

    // group name is absent
  },
  retieve: (req, res) => {
    const db = req.app.get("db");

    const { contactid } = req.body;

    // .findOne({ id: req.params.id })

    console.log(req.params.id);

    // db.groups_track
    //   .find({ contactid: req.params.id })
    //   .then(data => {
    //     console.log(data);
    //     res.status(201).json(data);
    //   })
    //   .catch(err => {
    //     res.status(500).end();
    //   });

    db.query(
      `SELECT group_name FROM groups INNER JOIN groups_track ON groups.id = groups_track.groupid WHERE contactid = ${req.params.id}`
    )
      .then(data => {
        console.log(data);
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(500).end();
      });
  }
};
