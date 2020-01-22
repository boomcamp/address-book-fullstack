const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../../secret");

const create = (req, res) => {
	const db = req.app.get("db");
	const { groupname, userid } = req.body;

	db.groupcontacts
		.insert({
			groupname,
			userid
		})
		.then(group => {
			res.status(201).json(group);
		})
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getList = (req, res) => {
	const db = req.app.get("db");

	db.groupcontacts
		.find()
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const deleteGroup = (req, res) => {
	const db = req.app.get("db");
	const { groupid } = req.params;

	db.groupcontacts
		.destroy({ id: groupid })
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getGroupsByUser = (req, res) => {
	const db = req.app.get("db");
	const { userid } = req.params;

	db.groupcontacts
		.find({ userid: userid })
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getGroupsByContactId = (req, res) => {
	const db = req.app.get("db");
	const { contactid, userid } = req.params;

	db.query(
		`SELECT * FROM groupcontacts t1 WHERE NOT EXISTS (SELECT * FROM groupmembers t2 WHERE t1.id = t2.groupid AND t2.contactid = ${contactid}) AND t1.userid = ${userid} `
	)
		.then(results => {
			res.status(200).send(results);
		})
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const editGroup = (req, res) => {
	const db = req.app.get("db");
	const { groupid } = req.params;
	const { editGroupName } = req.body;
	db.groupcontacts
		.save({
			id: groupid,
			groupname: editGroupName
		})
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const addMember = (req, res) => {
	const db = req.app.get("db");
	const { contactid, groupid } = req.body;
	db.groupmembers
		.insert({
			groupid,
			contactid
		})
		.then(member => res.status(200).json(member))
		.catch(err => {
			res.status(500).end();
			console.error(err);
		});
};

const allMembers = (req, res) => {
	const db = req.app.get("db");

	db.groupmembers
		.find()
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getMembersByGroup = (req, res) => {
	const db = req.app.get("db");
	const { groupid } = req.params;

	db.groupmembers
		.join({
			contacts: {
				type: "INNER",
				on: {
					id: "contactid"
				}
			}
		})
		.find({
			groupid: groupid
		})
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const deleteContactFromGroup = (req, res) => {
	const db = req.app.get("db");
	const { contactid, groupid } = req.params;

	db.groupmembers
		.destroy({
			contactid: contactid,
			and: [
				{
					groupid
				}
			]
		})
		.then(contacts => res.status(200).json(contacts))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getMembersGroup = (req, res) => {
	const db = req.app.get("db");
	const { contactid } = req.params;

	db.query(
		`select groupcontacts.id, userid, groupname from groupmembers INNER JOIN groupcontacts ON groupmembers.groupid = groupcontacts.id where contactid=${contactid};`
	)
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const deleteMembersGroup = (req, res) => {
	const db = req.app.get("db");
	const { contactid, groupid } = req.params;

	db.groupmembers
		.destroy({ contactid: contactid, groupid })
		.then(contacts => res.status(200).json(contacts))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

module.exports = {
	create,
	getList,
	deleteGroup,
	getGroupsByUser,
	editGroup,
	addMember,
	allMembers,
	getMembersByGroup,
	deleteContactFromGroup,
	getMembersGroup,
	deleteMembersGroup,
	getGroupsByContactId
};
