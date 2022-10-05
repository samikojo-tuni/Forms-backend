module.exports = app => {
	const usages = require("../controllers/usage.controller.js");

	var router = require("express").Router();

	router.post("/", usages.create);

	router.get("/", usages.findAll);

	// Retrieve a single Usage with id
	router.get("/:id", usages.findOne);

	// Update a Usage with id
	router.put("/:id", usages.update);

	// Delete a Usage with id
	router.delete("/:id", usages.delete);

	// Delete all Usages
	router.delete("/", usages.deleteAll);

	app.use('/api/usages', router);
};