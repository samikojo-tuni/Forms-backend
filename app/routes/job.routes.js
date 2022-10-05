module.exports = app => {
	const jobs = require("../controllers/job.controller.js");

	var router = require("express").Router();

	router.post("/", jobs.create);

	router.get("/", jobs.findAll);

	// Retrieve a single Job with id
	router.get("/:id", jobs.findOne);

	// Update a Job with id
	router.put("/:id", jobs.update);

	// Delete a Job with id
	router.delete("/:id", jobs.delete);

	// Delete all Jobs
	router.delete("/", jobs.deleteAll);

	app.use('/api/jobs', router);
};