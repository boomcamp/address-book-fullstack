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
  deleteToGroup: (req, res) => {
    const db = req.app.get("db");

    const { group_name, contactid } = req.body;

    db.query(
      `SELECT groups_track.id FROM groups_track INNER JOIN groups ON groups.id = groups_track.groupid WHERE groups.group_name = '${group_name}' AND contactid = ${contactid}`
    )
      .then(data => {
        db.groups_track
          .destroy(data[0])
          .then(data => {
            res.status(201).json(data);
          })
          .catch(err => {
            res.status(500).end();
          });
      })
      .catch(err => {
        res.status(500).end();
      });
  },
  addReference: (req, res) => {
    // if (!req.headers.authorization) {
    //   return res.status(401).end();
    // }
    // const token = req.headers.authorization.split(" ")[1];

    // jwt.verify(token, secret);

    const db = req.app.get("db");

    const { group_name, contactid, past_group } = req.body;

    let contact_added_date = new Date().toISOString().slice(0, 10);
    let group_date_created = new Date().toISOString().slice(0, 10);

    // group name is already available
    if (group_name === "") {
      db.query(
        `SELECT groups_track.id FROM groups_track INNER JOIN groups ON groups.id = groups_track.groupid WHERE groups.group_name = '${past_group}' AND contactid = ${contactid};`
      )
        .then(data => {
          db.groups_track
            .destroy(data[0])
            .then(data => {
              res.status(201).json(data);
            })
            .catch(err => {
              res.status(500).end();
            });
        })
        .catch(err => {
          res.status(500).end();
        });
    } else {
      db.groups
        .findOne({ group_name })
        .then(data => {
          console.log("same group", data);

          if (data) {
            db.query(
              `SELECT groups_track.id 
              FROM groups_track 
              INNER JOIN groups 
              ON groups_track.groupid = groups.id 
              WHERE groups_track.contactid = ${contactid} 
              AND groups.group_name = '${group_name}'`
            )
              .then(check_data => {
                if (check_data.length > 0) {
                  console.log("not adding to groups track ", check_data.length);

                  res.status(201).json(check_data);
                } else {
                  console.log("adding to groups track ", check_data.length);

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
                      console.log(err);
                      res.status(500).end();
                    });
                }
              })
              .catch(err => {
                console.log(err);

                res.status(500).end();
              });
          } else {
            console.log("create group", group_name);

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
                    console.log(err);
                    res.status(500).end();
                  });

                // res.status(201).json(post);
              })
              .catch(err => {
                res.status(500).end();
              });
          }

          // res.status(200).json(data);
        })
        .catch(err => {
          // add new group name to table
          // group name is new
          console.log("new group", group_name);

          // res.status(500).end();
        });
    }
  },
  retieve: (req, res) => {
    const db = req.app.get("db");

    const { contactid } = req.body;

    // .findOne({ id: req.params.id })

    // console.log(req.params.id);

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
      `SELECT groups.id,groups.group_name FROM groups INNER JOIN groups_track ON groups.id = groups_track.groupid WHERE contactid = ${req.params.id}`
    )
      .then(data => {
        console.log("groups", data);
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(500).end();
      });
  },
  getGroupList: (req, res) => {
    const db = req.app.get("db");

    // db.query(
    //   `SELECT groups.group_name, groups.id FROM groups INNER JOIN groups_track ON groups.id = groups_track.groupid`
    // );

    db.query(
      `SELECT group_name, groups.id
      FROM groups
      JOIN groups_track
      ON groups.id = groups_track.groupid
      JOIN address_book
      ON address_book.contactid = groups_track.contactid
      WHERE address_book.userid = ${req.params.userid}
      `
    )
      .then(data => {
        // console.log("groups", data);
        res.status(201).json(data);
      })
      .catch(err => {
        console.log();
        res.status(500).end();
      });
    ``;
  },
  getGroupsContacts: (req, res) => {
    const db = req.app.get("db");

    // const { groupid } = req.body;
    const { order } = req.query;

    db.query(
      `SELECT  contacts.id,
              first_name,	
              last_name,	
              home_phone,	
              mobile_phone,	
              work_phone,
              email,
              city,
              state_or_province,
              postal_code,
              country
        FROM contacts
        JOIN address_book
        ON address_book.contactid = contacts.id 
        JOIN groups_track
        ON contacts.id = groups_track.contactid
        WHERE
        ${
          req.params.groupid
            ? `groups_track.groupid = ${req.params.groupid}
        AND`
            : ``
        }
          address_book.userid = ${req.params.userid}
        ${order ? `ORDER BY last_name ${order}` : ""}`
    )

      // db.query(
      //   `SELECT 	contacts.id,	first_name,	last_name,	home_phone,	mobile_phone,	work_phone,	email,	city,	state_or_province,	postal_code,	country FROM contacts INNER JOIN groups_track ON contacts.id = groups_track.contactid WHERE groups_track.groupid = ${req.params.id};`
      // )
      .then(data => {
        // console.log("groups", data);
        res.status(201).json(data);
      })
      .catch(err => {
        res.status(500).end();
      });
  }
};
