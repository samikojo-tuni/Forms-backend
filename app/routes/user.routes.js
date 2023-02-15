const { verifyUser, authJwt } = require('../middleware');

module.exports = app => {
	const users = require('../controllers/user.controller.js');

	let router = require('express').Router();

	router.post("/", [verifyUser.checkDuplicateEmail], users.create);
	router.post("/login", users.authenticate);
	// TODO: Lisää myös logout

	// Käyttäjän tiedot palautetaan vain, jos käyttäjä on kirjautut sisään ja hän on admin-käyttäjä.
	router.get("/:email", [authJwt.verifyToken, verifyUser.isAdmin], users.findOne);

	app.use("/api/users", router);
}