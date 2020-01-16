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

module.exports = {
	create,
	getList,
	deleteGroup,
	getGroupsByUser,
	editGroup
};
