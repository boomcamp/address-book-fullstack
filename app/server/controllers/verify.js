const jwt = require('jsonwebtoken');
const secret = require('../../secret');

function verifyUser(req, res) {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    try {
        const token = req.headers.authorization.split('')[1];
        jwt.verify(token, secret);
        res.status(200).json({ data: 'here is the protected data' });
    } catch (err) {
        console.error(err);
        res.status(401).end();
    }
}

module.exports = {
    verifyUser
}