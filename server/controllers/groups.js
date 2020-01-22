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
    const { groupName, groupMembers } = req.body;
    const { userID } = req.params;

    db.groups.insert({
      groupName,
      userID
    })
    .then((group) => {
      if(groupMembers.length !== 0){
        for(let memberID of groupMembers){
          db.query(`INSERT INTO groups_members("groupID", "abID") VALUES (${group.groupID}, ${memberID})`)
        }
      }
      res.status(201).send(`${group.groupName}`);
    })
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
    const { id } = req.params;

    //db.query(`DELETE g, gm FROM groups AS g INNER JOIN groups_members AS gm ON g."groupID" = gm."groupID" WHERE g."groupID" = ${groupID}`)
    db.query(`DELETE FROM groups_members WHERE "groupID" = ${id}`)
    .then(() => {
      db.query(`DELETE FROM groups WHERE "groupID" = ${id}`)
      .then(() => {
        res.status(200).send("Group Deleted")
      })
      .catch(err => {
        console.error(err);
        res.status(500).end();
      })
    })
    .catch( error => {
      console.error(error);
      res.status(500).end();
    })
  },
  addMembers: (req, res) => {
    const db = req.app.get("db");
    const { groupMembers } = req.body;
    const { id } = req.params;
    let newContact = [];
    console.log(req.body)

    // if(groupMembers.length !== 0){
    //   for(let index in groupMembers){
    //     db.query(`INSERT INTO groups_members("groupID", "abID") VALUES (${id}, ${groupMembers[index]})`)
    //     // db.groups_members.insert({ groupID: id, abID: groupMembers[index]})
    //     // .then(contact => newContact.push(contact))
    //     if(index+1 === groupMembers.length){
    //       res.status(201).send(newContact);
    //     }
    //   }
    // }
  },
  deleteMember: (req, res) => {
    const db = req.app.get("db");
    const { id, groupMemberID } = req.params;

    db.groups_members
    .destroy({
      groupMember_ID: groupMemberID,
      groupID: id
    })
    .then(() => res.status(200).send('Group Member Deleted'))
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
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
    const { id } = req.params;

    db.query(`SELECT DISTINCT * FROM address_book as ab WHERE NOT EXISTS(SELECT * FROM groups_members as gm WHERE ab."abID" = gm."abID" AND gm."groupID" = ${id})`)
    .then(contacts => {
      res.status(200).send(contacts);
    })
    .catch(error => {
      console.error(error);
      res.status(500).end();
    })
  },
}