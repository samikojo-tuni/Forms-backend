// Tietokannan käyttöönotto
const db = require('../models');

// Työntekijä-malli
const Employee = db.employees;

// Luo uuden työntekijän tietokantaan
exports.create = (req, res) => {
	// TODO: Lisää virheenkäsittely

	// Muodosta Employee-olio, joka voidaan välittää tietokantamallille
	const employee = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	};

	Employee.create(employee)
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			res.status(500).send({
				message: error.message || "Some error occurred while creating the Employee."
			});
		});
};

exports.findAll = (req, res) => {
	Employee.findAll()
		.then(data => {
			res.send(data);
		})
		.catch(error => {
			res.status(500).send({
				message: error.message || "Some error occurred while retrieving employees."
			});
		});
};

// Hae yhden työntekijän tiedot
exports.findOne = (req, res) => {
	const id = req.params.id;

	Employee.findByPk(id)
		.then(data => {
			if (data) {
				res.send(data);
			}
			else {
				res.status(404).send({
					message: `Cannot find Employee with id=${id}.`
				});
			}
		})
		.catch(error => {
			res.status(500).send({
				message: "Error retrieving Employee with id=" + id
			});
		});
};

// Päivitetään työntekijän tiedot
exports.update = (req, res) => {
	const id = req.params.id;

	Employee.update(req.body, {
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Employee was updated successfully."
				});
			}
			else {
				res.send({
					message: `Cannot update Employee with id=${id}.`
				});
			}
		})
		.catch(error => {
			res.status(500).send({
				message: "Error updating Employee with id=" + id
			});
		});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	Employee.destroy({
		where: { id: id }
	})
		.then(num => {
			if (num == 1) {
				res.send({
					message: "Employee was deleted successfully!"
				});
			}
			else {
				res.send({
					message: `Cannot delete Employee with id=${id}. Employee was not found!`
				});
			}
		})
		.catch(error => {
			res.status(500).send({
				message: "Could not delete Employee with id=" + id
			});
		});
};

exports.deleteAll = (req, res) => {
	Employee.destroy({
		where: {},
		truncate: false
	})
		.then(num => {
			res.send({ message: `${num} Employees were deleted successfully!` });
		})
		.catch(error => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while removing all employees."
			});
		});
};