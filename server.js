const express = require("express");
const cors = require("cors");

const app = express();

let corsOptions = {
	origin: "http://127.0.0.1:5173"
};

app.use(cors(corsOptions));

// Sovellus hyväksyy JSON-muotoista dataa - application/json
app.use(express.json());

// Sovellus hyväksyy myös URL-enkoodattua dataa - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Luodaan tietokantayhteys ja annetaan Sequelizen synkronisoida tietokanta sovelluksen kanssa
const db = require('./app/models');
db.sequelize.sync().then(() => {
	console.log("Database syncronized");
}).catch((error) => {
	console.log(error);
});

// Pakottaa tietokannan luomaan itsensä uudelleen. Tallennettu data menetetään.
// VAIN KEHITYSAIKAISEEN KÄYTTÖÖN!
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });

// Oletusviesti, kun sovellusta käytetään suoraan sen osoitteen kautta
app.get("/", (req, res) => {
	res.json({ message: "Varastonhallintasovellus" })
});

// Reititykset
require('./app/routes/employee.routes')(app);
require('./app/routes/component.routes')(app);
require('./app/routes/job.routes')(app);
require('./app/routes/usage.routes')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`The app is running on port ${PORT}`);
});

