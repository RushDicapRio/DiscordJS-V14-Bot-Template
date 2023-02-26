const client = require("../index");
const { PermissionsBitField, Routes, REST, User } = require('discord.js');
const fs = require("fs");
const colors = require("colors");

module.exports = (client, config) => {
  console.log("0------------------| Gestionnaire de commandes d'application :".blue);

  let commands = [];

  // Gestionnaire de commandes slash :
  fs.readdirSync('./commands/slash/').forEach((dir) => {
    console.log('[!] Commencé à charger les commandes slash...'.yellow);
    const SlashCommands = fs.readdirSync(`./commands/slash/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of SlashCommands) {
      let pull = require(`../commands/slash/${dir}/${file}`);

      if (pull.name, pull.description, pull.type == 1) {
        client.slash_commands.set(pull.name, pull);
        console.log(`[GESTIONNAIRE - SLASH] Chargé un fichier : ${pull.name} (#${client.slash_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          description: pull.description,
          type: pull.type || 1,
          options: pull.options ? pull.options : null,
          default_permission: pull.permissions.DEFAULT_PERMISSIONS ? pull.permissions.DEFAULT_PERMISSIONS : null,
          default_member_permissions: pull.permissions.DEFAULT_MEMBER_PERMISSIONS ? PermissionsBitField.resolve(pull.permissions.DEFAULT_MEMBER_PERMISSIONS).toString() : null
        });

      } else {
        console.log(`[GESTIONNAIRE - SLASH] Impossible de charger le fichier ${file}, la valeur du nom de module manquant, la description ou le type n'est pas 1.`.red)
        continue;
      };
    };
  });

  // Gestionnaire de commandes utilisateur :
  fs.readdirSync('./commands/user/').forEach((dir) => {
    console.log('[!] Commencé à charger les commandes utilisateur...'.yellow);
    const UserCommands = fs.readdirSync(`./commands/user/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of UserCommands) {
      let pull = require(`../commands/user/${dir}/${file}`);

      if (pull.name, pull.type == 2) {
        client.user_commands.set(pull.name, pull);
        console.log(`[GESTIONNAIRE - UTILISATEUR] Chargé un fichier : ${pull.name} (#${client.user_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          type: pull.type || 2,
        });

      } else {
        console.log(`[GESTIONNAIRE - UTILISATEUR] Impossible de charger le fichier ${file}, la valeur du nom du module manquant ou le type n'est pas 2.`.red)
        continue;
      };
    };
  });

  // Gestionnaire de commandes de message :
  fs.readdirSync('./commands/message/').forEach((dir) => {
    console.log('[!] Commencé à charger les commandes de message...'.yellow);
    const UserCommands = fs.readdirSync(`./commands/message/${dir}`).filter((file) => file.endsWith('.js'));

    for (let file of UserCommands) {
      let pull = require(`../commands/message/${dir}/${file}`);

      if (pull.name, pull.type == 3) {
        client.message_commands.set(pull.name, pull);
        console.log(`[GESTIONNAIRE - MESSAGE] Chargé un fichier : ${pull.name} (#${client.user_commands.size})`.brightGreen);

        commands.push({
          name: pull.name,
          type: pull.type || 3,
        });

      } else {
        console.log(`[GESTIONNAIRE - MESSAGE] Impossible de charger le fichier ${file}, la valeur du nom du module manquant ou le type n'est pas 2.`.red)
        continue;
      };
    };
  });

  // Enregistrement de toutes les commandes de l'application :
  if (!config.Client.ID) {
    console.log("[CRASH] Vous devez fournir votre ID de bot dans config.js !".red + "\n");
    return process.exit();
  };

  const rest = new REST({ version: '10' }).setToken(config.Client.TOKEN || process.env.TOKEN);

  (async () => {
    console.log("[GESTIONNAIRE] Commencé à enregistrer toutes les commandes de l'application.".yellow);

    try {
      await rest.put(
        Routes.applicationCommands(config.Client.ID),
        { body: commands }
      );

      console.log("[GESTIONNAIRE] Enregistrement réussi de toutes les commandes d'application.".brightGreen);
    } catch (err) {
      console.log(err);
    }
  })();
};