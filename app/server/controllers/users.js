const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

function register(req, res) {
    const db = req.app.get('db');


}

module.exports = {
    register
}