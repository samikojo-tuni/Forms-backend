// Tietokannan asetukset
module.exports = {
	HOST: "localhost",
	USER: "varasto-server",
	PASSWORD: "Varasto-Salasana",
	DB: "varasto",
	dialect: "mariadb",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};