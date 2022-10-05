module.exports = (sequelize, Sequelize) => {
	const Usage = sequelize.define("Usage", {
		amount: {
			type: Sequelize.INTEGER,
		},
		time: {
			type: Sequelize.DATE,
			defaultValue: Sequelize.NOW
		}
	});

	return Usage;
}