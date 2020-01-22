const jwt = require('jsonwebtoken');
const secret = require('../../secret.js');

const auth = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(401).json({ msg: 'need token' });
	}
	try {
		const token = req.headers.authorization.split(' ')[1];
		jwt.verify(token, secret);
		next();
	} catch (err) {
		console.error(err);
		res.status(401).json({ msg: 'need correct token' });
	}
};

module.exports = auth;
