module.exports = {
  create: (req, res) => {
    const db = req.app.get("db");
    const {
      userid,
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
    } = req.body;

    db.book
      .findOne({ userid })
      .then(data => {
        return db.contacts
          .insert({
            bookid: data.id,
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
          })
          .then(contact => res.status(200).json(contact))
          .catch(() => {
            res.status(500).end();
          });
      })
      .catch(() => {
        res.status(500).end();
      });
  },
  list: (req, res) => {
    const db = req.app.get("db");
    const { sort, group } = req.query;

    if (group && group !== "all") {
      db.query(
        `select contacts.id as id, bookid, first_name, last_name, home_phone, 
								mobile_phone, work_phone, contacts.email, city, state_or_province, postal_code, country
								FROM groups, grouplist, contacts, users 
								WHERE users.id=groups.userid 
								AND grouplist.groupid=groups.id 
								AND contacts.id=grouplist.contactid 
								AND users.id=${req.params.id}
								AND groups.id=${group}
								ORDER BY ${sort} ASC`
      )
        .then(test => res.status(200).json(test))
        .catch(err => res.status(500).end());
    } else {
      db.book.findOne({ userid: req.params.id }).then(data => {
        if (sort) {
          db.contacts
            .find(
              { bookid: data.id },
              {
                order: [{ field: sort, direction: "asc" }]
              }
            )
            .then(contact => {
              res.status(200).json(contact);
            })
            .catch(err => {
              console.error(err);
              res.status(500).end();
            });
        } else {
          db.contacts
            .find({ bookid: data.id })
            .then(contact => {
              res.status(200).json(contact);
            })
            .catch(err => {
              console.error(err);
              res.status(500).end();
            });
        }
      });
    }
  },
  update: (req, res) => {
    const db = req.app.get("db");
    const {
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
    } = req.body;

    db.contacts
      .update(
        { id: req.params.id },
        {
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
        }
      )
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  delete: (req, res) => {
    const db = req.app.get("db");
    db.contacts
      .destroy({ id: req.params.id })
      .then(contact => res.status(200).json(contact))
      .catch(err => {
        console.error(err);
        res.status(500).end();
      });
  },
  getByGroup: (req, res) => {
    const db = req.app.get("db");
    const { userid, groupid } = req.params;
    db.groups
      .find(userid)
      .then(() => {
        return db
          .query(
            `select  contacts.id, first_name, last_name, mobile_phone 
            from  grouplist, contacts 
            where grouplist.groupid = ${groupid}
            and contacts.id = grouplist.contactid`
          )
          .then(contact => {
            res.status(200).json(contact);
          })
          .catch(() => res.status(500).end());
      })
      .catch(() => res.status(500).end());
  }
};
