function createGroup(req, res) {
    const db = req.app.get("db");
    const { userId, groupName } = req.body;
    db.groups
        .save({
            userId,
            groupName
        },
            {
                fields: ["groupId", "userId", "groupName"]
            })
        .then(post => res.status(201).json(post))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}
function addMember(req, res) {
    const db = req.app.get("db");
    const { contactId, GroupId, first_name, last_name, mobile_number } = req.body;
    db.members
        .save({
            contactId,
            GroupId,
            first_name,
            last_name,
            mobile_number
        },
            {
                fields: ["id", "contactId", "GroupId", "first_name", "last_name", "mobile_number"]
            })
        .then(add => res.status(201).json(add))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}
function getGroup(req, res) {
    const db = req.app.get("db");
    db.groups
        .find()
        .then(post => res.status(201).json(post))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}
function getGroupMember(req, res) {
    const db = req.app.get("db");
    db.members
        .find()
        .then(post => res.status(201).json(post))
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
}
function DeleteGroup(req, res) {
    const db = req.app.get("db");
    db.query(
        `DELETE FROM groups,members FROM groups INNER JOIN members ON members.GroupId = groups.groupId WHERE groups.groupId = ${req.params.id};`
    ).then(Del => res.status(201).json(Del)).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}
function getContacttoAdd(req, res) {
    const db =  req.app.get("db");
    db.query(
        `SELECT contact.* FROM contact WHERE id NOT IN (select "contactId" from members where "GroupId"=${req.params.id});`
    ).then(result => res.status(201).json(result)).catch(err => {
        console.log(err);
        res.status(500).end();
    })
}
function removemember(req, res) {
    const db =  req.app.get("db");
   db.query(`DELETE FROM members WHERE id=${req.params.id}`)
   .then(result => res.status(201).json(result))
   .catch(err => {
       console.log(err);
       res.status(500).end();
   })
}
module.exports = {
    createGroup,
    getGroup,
    addMember,
    getGroupMember,
    DeleteGroup,
    getContacttoAdd,
    removemember
}

