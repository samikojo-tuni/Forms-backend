const db = require("../models");
const Component = db.components;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
	// Validate request
	if (!req.body.name) {
		res.status(400).send({
			message: "Content can not be empty!"
		});
		return;
	}

	const component = {
		name: req.body.name,
		amount: req.body.amount ?? 0,
	};

	Component.create(component)
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while creating the Component."
			});
		});
};

exports.findAll = (req, res) => {
	const name = req.query.name;
	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

	Component.findAll({ where: condition })
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving Components."
			});
		});
};

exports.findOne = (req, res) => {
	const id = req.params.id;

	Component.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Cannot find Component with id=${id}.`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error retrieving Component with id=" + id
			});
		});
};

exports.update = (req, res) => {
	const id = req.params.id;

	Component.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Component was updated successfully."
				});
			} else {
				res.send({
					message: `Cannot update Component with id=${id}. Maybe Component was not found or req.body is empty!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Error updating Component with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Component.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Component was deleted successfully!"
				});
			} else {
				res.send({
					message: `Cannot delete Component with id=${id}. Maybe Component was not found!`
				});
			}
		})
		.catch(err => {
			res.status(500).send({
				message: "Could not delete Component with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Component.destroy({
		where: {},
		truncate: false
	})
		.then(nums => {
			res.send({ message: `${nums} Components were deleted successfully!` });
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all Components."
			});
		});
};
