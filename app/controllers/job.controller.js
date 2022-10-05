const db = require("../models");
const Job = db.jobs;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.code) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	const job = {
		code: req.body.code,
		start_date: req.body.start_date ?? Date.now(),
		due_date: req.body.due_date ?? Date.now()
	};

	Job.create(job)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Job object."
			});
		});
};

exports.findAll = (req, res) => {
	const code = req.query.code;
	var condition = code ? { code: { [Op.like]: `%${code}%` } } : null;

	Job.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving jobs."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Job.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Job with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Job with id=" + id
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Job.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Job was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Job with id=${id}. Jork was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Job with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Job.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Job was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Job with id=${id}. Maybe Job was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Job with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Job.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Jobs were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Jobs."
			});
		});
};
