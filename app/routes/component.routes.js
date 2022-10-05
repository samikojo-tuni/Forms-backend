module.exports = app => {
	const components = require("../controllers/component.controller.js");

	var router = require("express").Router();

	router.post("/", components.create);

	router.get("/", components.findAll);

	// Retrieve a single Component with id
	router.get("/:id", components.findOne);

	// Update a Component with id
	router.put("/:id", components.update);

	// Delete a Component with id
	router.delete("/:id", components.delete);

	// Delete all Components
	router.delete("/", components.deleteAll);

	app.use('/api/components', router);
};