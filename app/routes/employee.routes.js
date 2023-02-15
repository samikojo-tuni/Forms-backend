const { verifyUser, authJwt } = require('../middleware');

module.exports = app => {
	// Viittaus employee kontrolleriin
	const employees = require('../controllers/employee.controller.js');

	// Viittaus reitittimeen (reittien määrittämiseksi)
	let router = require('express').Router();

	// Uuden työntekijän luominen. Linkitetään HTTP POST metodi create-funktioon.
	router.post("/", [authJwt.verifyToken, verifyUser.isAdmin], employees.create);

	// Kaikkien työntekijöiden listaus
	router.get("/", [authJwt.verifyToken], employees.findAll);

	// Yhden työntekijän listaus
	router.get("/:id/", [authJwt.verifyToken], employees.findOne);

	// Päivitä työntekijän tiedot
	router.put("/:id", [authJwt.verifyToken, verifyUser.isAdmin], employees.update);

	// Poista yksi työntekijä
	router.delete("/:id", [authJwt.verifyToken, verifyUser.isAdmin], employees.delete);

	// Poista kaikki työntekijät
	router.delete("/", [authJwt.verifyToken, verifyUser.isAdmin], employees.deleteAll);

	app.use('/api/employees', router);
};