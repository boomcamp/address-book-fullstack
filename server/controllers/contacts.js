const create = (req, res) => {
	const db = req.app.get('db');
	const {
		userId,
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
			userId,
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

	db.contacts
		.find({
			userId: req.params.id
		})
		.then(contact => res.status(200).json(contact))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

module.exports = { create, view };
