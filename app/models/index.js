// Tietokantayhteys luodaan tässä tiedostossa.
// Tiedosto myös luo tietokannan rakenteen tarvittaessa.

const dbConfig = require("../config/db.config.js");

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
	// Lue yhteyden tiedot konfiguraatiotiedostosta
	dbConfig.DB,
	dbConfig.USER,
	dbConfig.PASSWORD,
	{
		host: dbConfig.HOST,
		dialect: dbConfig.dialect,
		pool: {
			max: dbConfig.pool.max,
			min: dbConfig.pool.min,
			acquire: dbConfig.pool.acquire,
			idle: dbConfig.pool.idle
		}
	}
);

const db = {};
db.Sequelize = Sequelize; // Viittaus tyyppiin
db.sequelize = sequelize; // Viittaus olioon

// Ota käyttöön sovelluksen käyttämät tietokantamallit
db.employees = require('./employee.model.js')(sequelize, Sequelize);
db.components = require('./component.model.js')(sequelize, Sequelize);
db.jobs = require('./job.model.js')(sequelize, Sequelize);
db.usage = require('./usage.model.js')(sequelize, Sequelize);
db.users = require('./user.model.js')(sequelize, Sequelize);

// Mallien väliset riippuvuudet
db.components.hasOne(db.usage, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' });
db.employees.hasOne(db.usage, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' });
db.jobs.hasOne(db.usage, { onUpdate: 'CASCADE', onDelete: 'RESTRICT' });

module.exports = db;