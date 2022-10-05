module.exports = (sequelize, Sequelize) => {
	const Component = sequelize.define("Component", {
		name: {
			type: Sequelize.STRING
		},
		amount:
		{
			type: Sequelize.INTEGER
		}
	});

	return Component;
};