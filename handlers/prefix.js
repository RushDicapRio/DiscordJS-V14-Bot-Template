const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
  console.log("0------------------| Gestionnaire de préfixes :".blue);

  fs.readdirSync('./commands/prefix/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/prefix/${dir}`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/prefix/${dir}/${file}`);
      if (pull.config.name) {
        client.prefix_commands.set(pull.config.name, pull);
        console.log(`[GESTIONNAIRE - PREFIX] Chargé un fichier : ${pull.config.name} (#${client.prefix_commands.size})`.brightGreen)
      } else {
        console.log(`[GESTIONNAIRE - PREFIX] Impossible de charger le fichier ${file}, valeur de nom de module manquante .`.red)
        continue;
      };
    };
  });
};