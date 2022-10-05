module.exports = (sequalize, Sequalize) => {
	const Employee = sequalize.define("Employee",
		{
			first_name: {
				type: Sequalize.STRING
			},
			last_name: {
				type: Sequalize.STRING
			},
			phone: {
				type: Sequalize.STRING
			}
		});

	return Employee;
};