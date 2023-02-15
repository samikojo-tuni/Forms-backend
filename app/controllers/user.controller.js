const config = require('../config/auth.config.js');
const db = require('../models');
const User = db.users;
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
	// TODO: lisää virheentarkastelu
	const user = {
		firstName: req.body.first_name,
		lastName: req.body.last_name,
		email: req.body.email,
		password: req.body.password,
		accountType: req.body.account_type // TODO: Estä admin-tilien luominen webbikäyttöliittymästä!
	};

	User.create(user).then(user => {
		res.send(user);
	}).catch(error => {
		res.status(500).send({
			message: error.message || "Some error occurred while creating the User."
		});
	});
};

exports.findOne = (req, res) => {
	const email = req.params.email;

	User.findOne({
		where: {
			email: email
		}
	}).then(user => {
		if (user) {
			res.send(user);
		}
		else {
			res.status(404).send({
				message: `Cannot find Employee with email=${email}.`
			});
		}
	}).catch(error => {
		res.status(500).send({
			message: error.message || "Error retrieving Employee with email=" + email
		});
	});
};

exports.authenticate = (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	User.findOne({
		where: {
			email: email
		}
	}).then(user => {
		if (!user) {
			// Käyttäjää ei löytynyt tietokannasta!
			return res.status(404).send({
				message: `Cannot find User with email=${email} from the database.`
			});
		}

		if (user.isValidPassword(password)) {
			var token = jwt.sign({ email: user.email }, config.secret, {
				expiresIn: 24 * 60 * 60 // Token on voimassa vuorokauden
			});

			res.status(200).send({
				email: user.email,
				account_type: user.accountType,
				token: token
			});
		} else {
			res.status(401).send({
				accessToken: null,
				message: "Invalid username and/or password!"
			});
		}
	}).catch(error => {
		res.status(401).send({
			message: error || "Invalid username and/or password!"
		});
	});
};