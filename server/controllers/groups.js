const createGroup = (req, res) => {
	const db = req.app.get('db');
	const { userId, group_name, date_created } = req.body;
	db.groups
		.insert({ userId, group_name, date_created })
		.then(group => res.status(201).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};
const viewGroup = (req, res) => {
	const db = req.app.get('db');

	db.groups
		.find({
			userId: req.params.id
		})
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};
const updateGroup = (req, res) => {
	const db = req.app.get('db');
	const { group_name } = req.body;

	db.groups
		.update(req.params.id, { group_name })
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};
const deleteGroup = (req, res) => {
	const db = req.app.get('db');

	db.groups
		.destroy(req.params.id)
		.then(group => res.status(200).json(group))
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};

module.exports = { createGroup, viewGroup, updateGroup, deleteGroup };
