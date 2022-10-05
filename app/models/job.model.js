module.exports = (sequelize, Sequelize) => {
	const Job = sequelize.define("Job", {
		start_date: {
			type: Sequelize.DATE
		},
		due_date: {
			type: Sequelize.DATE
		},
		code: {
			type: Sequelize.STRING
		}
	});

	return Job;
}