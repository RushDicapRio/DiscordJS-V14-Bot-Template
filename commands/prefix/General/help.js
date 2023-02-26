const { EmbedBuilder } = require("discord.js");
const fs = require('fs');

module.exports = {
  config: {
    name: "help",
    description: "Répond avec le menu help.",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {
    const commands = client.prefix_commands.map(command => `${prefix}${command.config.name}`);

    return message.reply(
      {
        embeds: [
          new EmbedBuilder()
            .setAuthor(
              {
                name: client.user.tag,
                iconURL: client.user.displayAvatarURL(
                  {
                    dynamic: true
                  }
                )
              }
            )
            .setDescription(commands.join(', '))
            .setFooter(
              {
                text: `→ Utilise ${prefix}info pour une information de commande.`
              }
            )
            .setColor('Blue')
        ]
      }
    );
  },
};