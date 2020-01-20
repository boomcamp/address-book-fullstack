const create = (req, res) => {
	const db = req.app.get('db');
	const {
		userid,
		firstname,
		lastname,
		home_phone,
		mobile_phone,
		work_phone,
		email,
		city,
		state_or_province,
		postal_code,
		country,
		date_created
	} = req.body;

	db.contacts
		.insert({
			userid,
			firstname,
			lastname,
			home_phone,
			mobile_phone,
			work_phone,
			email,
			city,
			state_or_province,
			postal_code,
			country,
			date_created
		})
		.then(contact => res.status(201).json(contact))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const view = (req, res) => {
	const db = req.app.get('db');
	db.query(
		`SELECT * FROM contacts WHERE userid = '${req.params.id}' ORDER BY lastname	${req.query.value}`
	).then(p => res.status(200).json(p));
};

function updateContact(req, res) {
	const db = req.app.get('db');
	const {
		firstname,
		lastname,
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
		.update(req.params.id, {
			firstname,
			lastname,
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
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
}
const deleteContact = (req, res) => {
	const db = req.app.get('db');

	db.contacts
		.destroy(req.params.id)
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};
const search = (req, res) => {
	const db = req.app.get('db');
	console.log(req.query);
	db.query(
		`SELECT * FROM contacts WHERE (userid = '${req.params.id}') AND (firstname ilike '%	${req.query.value}%' OR lastname ilike '%${req.query.value}%')`
	)
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const sort = (req, res) => {
	const db = req.app.get('db');

	db.query(
		`SELECT * FROM contacts WHERE userid = '${req.params.id}' ORDER BY lastname	 ${req.query.value}`
	)
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};
module.exports = { create, view, updateContact, deleteContact, search, sort };
