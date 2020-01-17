const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const secret = require('../../secret.js');

const create = (req, res) => {
	const db = req.app.get('db');
	const { firstname, lastname, username, email, password } = req.body;

	argon2
		.hash(password)
		.then(hash => {
			return db.users.insert(
				{
					firstname,
					lastname,
					username,
					email,
					password: hash
				},
				{
					fields: ['id', 'firstname', 'lastname', 'username', 'email']
				}
			);
		})
		.then(user => {
			const token = jwt.sign({ userId: user.id }, secret);
			delete user.password;
			res.status(201).json({ ...user, token });
		})
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const userlist = (req, res) => {
	const db = req.app.get('db');
	db.users
		.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const login = (req, res) => {
	const db = req.app.get('db');
	const { username, password } = req.body;

	db.users
		.findOne(
			{
				username
			},
			{
				fields: ['id', 'username', 'firstname', 'password']
			}
		)
		.then(user => {
			if (!user) {
				throw new Error('Invalid username');
			}

			return argon2.verify(user.password, password).then(valid => {
				if (!valid) {
					throw new Error('Incorrect password');
				}

				const token = jwt.sign({ userId: user.id }, secret);
				delete user.password;
				res.status(200).json({ ...user, token });
			});
		})
		.catch(err => {
			if (['Invalid username', 'Incorrect password'].includes(err.message)) {
				res.status(200).json({ error: err.message });
			} else {
				console.error(err);
				res.status(500).end();
			}
		});
};

const details = (req, res) => {
	const db = req.app.get('db');
	const { id } = req.params;
	db.users
		.findOne(id)
		.then(user => res.status(200).json(user))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

module.exports = {
	create,
	userlist,
	login,
	details
};
