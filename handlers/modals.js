const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
    console.log("0------------------| Gestionnaire de modaux :".blue);

    const modals = fs.readdirSync(`./modals/`).filter(file => file.endsWith('.js'));

    for (let file of modals) {

        let pull = require(`../modals/${file}`);
        if (pull.id) {
            client.modals.set(pull.id, pull);
            console.log(`[GESTIONNAIRE - MODALS] Chargé un fichier : ${file}`.brightGreen)
        } else {
            console.log(`[GESTIONNAIRE - MODALS] Impossible de charger le fichier ${file}. ID modal manquant.`.red)
            continue;
        }
    }
};