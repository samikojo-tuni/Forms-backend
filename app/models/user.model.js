const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User", {
		email: {
			type: Sequelize.STRING
		},
		firstName: {
			field: "first_name",
			type: Sequelize.STRING
		},
		lastName: {
			field: "last_name",
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING
		},
		// AccountType
		// -1: Account disabled
		//  0: Admin user
		//  1: Standard user
		accountType: {
			type: Sequelize.INTEGER,
			field: "account_type"
		}
	}, { // Options
		hooks: {
			beforeCreate: (user) => {
				// Salasanan salaus, kun käyttäjän tiedot tallennetaan tietokantaan.
				if (user.password != null) {
					const salt = bcrypt.genSaltSync(10, 'a');
					user.password = bcrypt.hashSync(user.password, salt);
				}
			},
			beforeUpdate: (user) => {
				if (user.password != null) {
					const salt = bcrypt.genSaltSync(10, 'a');
					user.password = bcrypt.hashSync(user.password, salt);
				}
			}
		}
	});

	// Ottaa parametrina selväkielisen salasanan ja vertaa sitä
	// Tietokantaan tallennettuun salattuun salasanaan (toteuttaa
	// selväkielisen salasanan salauksen aiemmin määritellyn suolan
	// avulla ja vertaa tulosta aiemmin tallennettuun salasanaan).
	User.prototype.isValidPassword = function (password) {
		return bcrypt.compareSync(password, this.password);
	};

	return User;
};