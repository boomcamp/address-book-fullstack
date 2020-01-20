const createMember = (req, res) => {
	const db = req.app.get('db');

	const { userid, groupid, contactid } = req.body;
	db.members
		.insert({ userid, groupid, contactid })
		.then(member => res.status(201).json(member))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const viewGroupMember = (req, res) => {
	const db = req.app.get('db');

	const { userid, groupid } = req.params;

	db.query(
		`SELECT * FROM members WHERE userid = '${userid}' AND groupid = '${groupid}'`
	).then(member => res.status(200).json(member));
};

const deleteMember = (req, res) => {
	const db = req.app.get('db');

	db.members
		.destroy(req.params.id)
		.then(member => res.status(200).json(member))
		.catch(err => {
			console.log(err);
			res.status(500).end();
		});
};
module.exports = {
	createMember,
	viewGroupMember,
	deleteMember
};
