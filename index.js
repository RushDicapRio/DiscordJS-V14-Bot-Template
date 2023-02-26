const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const colors = require("colors");

// Création d'un nouveau client :
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
      name: "https://github.com/RushDicapRio",
      type: 0
    }],
    status: 'dnd'
  }
});

// Hébergez le bot :
require('http').createServer((req, res) => res.end('Prêt.')).listen(3000);

// Obtenir le jeton du bot :
const AuthenticationToken = process.env.TOKEN || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn("[CRASH] Un jeton d'authentification pour le bot Discord est requis ! Utilisez Envrionment Secrets ou config.js.".red)
  return process.exit();
};

// Gestionnaires :
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "application_commands", "modals", "events", "mongoose"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});

// Connexion au bot :
client.login(AuthenticationToken)
  .catch((err) => {
    console.error("[CRASH] Une erreur s'est produite lors de la connexion à votre bot...");
    console.error("[CRASH] Erreur de l'API Discord :" + err);
    return process.exit();
  });

// Erreurs de gestionnaires :
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Unhandled Rejection : ${err}`.red);
  console.error(promise);
});