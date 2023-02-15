const { verifyUser, authJwt } = require('../middleware');

module.exports = app => {
	const components = require("../controllers/component.controller.js");

	var router = require("express").Router();

	router.post("/", [authJwt.verifyToken, verifyUser.isAdmin], components.create);

	router.get("/", [authJwt.verifyToken], components.findAll);

	// Retrieve a single Component with id
	router.get("/:id", [authJwt.verifyToken], components.findOne);

	// Update a Component with id
	router.put("/:id", [authJwt.verifyToken], components.update);

	// Delete a Component with id
	router.delete("/:id", [authJwt.verifyToken, verifyUser.isAdmin], components.delete);

	// Delete all Components
	router.delete("/", [authJwt.verifyToken, verifyUser.isAdmin], components.deleteAll);

	app.use('/api/components', router);
};