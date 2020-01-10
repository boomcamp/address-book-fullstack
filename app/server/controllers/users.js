const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const secret = require("../../../secret");

const register = (req, res) => {
	const db = req.app.get("db");
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
					fields: ["id", "firstname", "lastname", "username", "email"]
				}
			);
		})
		.then(user => {
			const token = jwt.sign({ userId: user.id }, secret);
			res.status(201).json({ ...user, token });
		})
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const login = (req, res) => {
	const db = req.app.get("db");
	const { username, password } = req.body;

	db.users
		.findOne(
			{
				username: username
			},
			{
				fields: ["id", "username", "email", "firstname", "lastname", "password"]
			}
		)
		.then(user => {
			if (!user) throw new Error("Invalid username!");

			return argon2.verify(user.password, password).then(valid => {
				if (!valid) throw new Error("Incorrect Password!");

				const token = jwt.sign({ userId: user.id }, secret);
				delete user.password;
				res.status(200).json({ ...user, token });
			});
		})
		.catch(err => {
			if (["Invalid username", "Incorrect password"].includes(err.message))
				res.status(401).json({ error: err.message });
			else {
				console.error(err);
				res.status(500).end();
			}
		});
};

const getUsers = (req, res) => {
	const db = req.app.get("db");

	db.users
		.find()
		.then(users => res.status(200).json(users))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

const getByUsersByUsername = (req, res) => {
	const db = req.app.get("db");
	const { username } = req.body;

	db.users
		.findOne({ username: username })
		.then(user => res.status(200).json(user))
		.catch(err => {
			console.error(err);
			res.status(500).end();
		});
};

module.exports = {
	register,
	login,
	getUsers,
	getByUsersByUsername
};
