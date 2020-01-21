module.exports = {
  listGroups: (req, res) => {
    const db = req.app.get("db");
    const { userID, order } = req.params;
    
    db.query(`SELECT * FROM groups WHERE "userID" = ${userID} ORDER BY "groupName" ${order}`)
    .then(groups => res.status(200).send(groups))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  addGroup: (req, res) => {
    const db = req.app.get("db");
    const { groupName } = req.body;
    const { userID } = req.params;

    db.groups
    .insert({
      groupName,
      userID
    })
    .then(group => res.status(201).send(contact))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  editGroup: (req, res) => {
    const db = req.app.get("db");
    const { groupName } = req.body;
    const { id } = req.params;
    db.groups
    .update({
      groupID: id
    },{
      groupName
    })
    .then(group => res.status(200).send(group))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  deleteGroup: (req, res) => {
    const db = req.app.get("db");
    const { groupID } = req.params;

    db.groups
    .destroy({
      groupID
    })
    .then( () => res.status(200).send("Group Deleted"))
    .catch( error => {
      console.error(error);
      res.status(500).end();
    })
  },
  addMembers: (req, res) => {
    const db = req.app.get("db");

  },
  deleteMember: (req, res) => {
    const db = req.app.get("db");
  },
  listContacts: (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;

    db.query(`SELECT 
                    "groupMember_ID", 
                    "groupID", 
                    ab."abID", 
                    "userID", 
                    "ab_firstName", 
                    "ab_lastName", 
                    "ab_home_phone", 
                    "ab_mobile_phone", 
                    "ab_work_phone", 
                    "ab_email", 
                    "ab_city", 
                    "ab_state", 
                    "ab_postal_code", 
                    "ab_country" 
              FROM 
                    groups_members as gm, 
                    address_book as ab 
              WHERE 
                    gm."abID" = ab."abID" AND 
                    "groupID" = ${id}
            `)
    .then(members => res.status(200).send(members))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
  listContactsNotInGroup: (req, res) => {
    const db = req.app.get("db");
    const { userID, order } = req.params;

    // db.address_book
    // .find({ userID })
    db.query(`SELECT * FROM address_book where "userID" = ${userID} ORDER BY "ab_lastName" ${order}`)
    .then(contacts => {
      res.status(200).send(contacts)
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
}