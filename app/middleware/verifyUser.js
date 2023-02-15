const db = require('../models');
const User = db.users;

checkDuplicateEmail = (req, res, next) => {
	User.findOne({
		where: {
			email: req.body.email
		}
	}).then(user => {
		if (user) {
			res.status(400).send({
				message: "Failed! Email is already in use!"
			});
			return;
		}

		next();
	}).catch(error => {
		res.status(500).send({
			message: error.message || "Internal server error"
		})
	});
};

isAdmin = (req, res, next) => {
	User.findOne({
		where: {
			email: req.email
		}
	}).then(user => {
		if (user && user.accountType == 0) {
			// Käyttäjä on tallennettu tietokantaan ja hänellä on admin-
			// oikeudet.
			next();
			return;
		}

		res.status(403).send({
			message: "Admin role is required!"
		});

		return;
	});
};

const verifyUser = {
	isAdmin,
	checkDuplicateEmail
};

module.exports = verifyUser;