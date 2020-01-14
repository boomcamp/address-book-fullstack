const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../../secret");

const create = (req, res) => {
	const db = req.app.get("db");
	const {
		firstname,
		lastname,
		email,
		home_phone,
		mobile_phone,
		work_phone,
		city,
		state_or_province,
		postal_code,
		country
	} = req.body;
	const { userid } = req.params;

	db.contacts
		.insert({
			userid,
			firstname,
			lastname,
			email,
			home_phone,
			mobile_phone,
			work_phone,
			email,
			city,
			state_or_province,
			postal_code,
			country
		})
		.then(contact => {
			res.status(201).json(contact);
		})
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getList = (req, res) => {
	const db = req.app.get("db");

	db.contacts
		.find()
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getContactsByUser = (req, res) => {
	const db = req.app.get("db");
	const { userid } = req.params;

	db.contacts
		.find({ userid: userid })
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

module.exports = {
	create,
	getList,
	getContactsByUser
};
