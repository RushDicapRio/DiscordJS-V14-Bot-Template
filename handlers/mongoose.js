const config = require("../config/config.js");
const superDjs = require("super-djs");

module.exports = (client) => {
	console.log(superDjs.colourText('[BASE DE DONNEE] Connexion à MongoDB...', 'yellow'));
	const mongo = process.env.MONGO || config.Handlers.MONGO;
	
	if (!mongo) {
		console.warn("[AVERTISSEMENT] Un URI/URL Mongo n'est pas fourni ! (Non requis)");
	} else {
		superDjs.connectMongoDB(mongo, true, superDjs.colourText('[BASE DE DONNEE] Connecté à MongoDB !', 'green'));	
	};
};