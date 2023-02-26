const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "ping",
    description: "Réponses avec pong !",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    message.reply({ embeds: [
      new EmbedBuilder()
        .setDescription(`🏓 **Pong !** Ping websocket client : \`${client.ws.ping}\` ms.`)
        .setColor("Green")
    ] })
  },
};