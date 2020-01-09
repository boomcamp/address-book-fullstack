const jwt = require("jsonwebtoken");
const secret = require("../secret");

module.exports = {
  auth: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).end();
    }

    try {
      const bearer = req.headers.authorization.split(" ")[0];
      if (!bearer.match(secret.bearer)) {
        return res.status(401).end();
      }
      const token = req.headers.authorization.split(" ")[1];
      jwt.verify(token, secret.key);

      next();
    } catch (err) {
      res.status(401).end();
    }
  }
};
