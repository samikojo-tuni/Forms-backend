const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

verifyToken = (req, res, next) => {
	let token = req.headers["x-access-token"];

	if (!token) {
		return res.status(403).send({
			message: "No token provided!"
		});
	}

	jwt.verify(token, config.secret, (error, decoded) => {
		if (error) {
			return res.status(401).send({
				message: "Unauthorized!"
			});
		}

		req.email = decoded.email;
		next();
	});
};

const authJwt = {
	verifyToken
};

module.exports = authJwt;