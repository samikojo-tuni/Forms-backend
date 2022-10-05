module.exports = app => {
	// Viittaus employee kontrolleriin
	const employees = require('../controllers/employee.controller.js');

	// Viittaus reitittimeen (reittien määrittämiseksi)
	let router = require('express').Router();

	// Uuden työntekijän luominen. Linkitetään HTTP POST metodi create-funktioon.
	router.post("/", employees.create);

	// Kaikkien työntekijöiden listaus
	router.get("/", employees.findAll);

	// Yhden työntekijän listaus
	router.get("/:id/", employees.findOne);

	// Päivitä työntekijän tiedot
	router.put("/:id", employees.update);

	// Poista yksi työntekijä
	router.delete("/:id", employees.delete);

	// Poista kaikki työntekijät
	router.delete("/", employees.deleteAll);

	app.use('/api/employees', router);
};