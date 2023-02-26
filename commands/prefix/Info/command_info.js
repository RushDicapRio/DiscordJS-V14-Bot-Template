const { EmbedBuilder, codeBlock } = require("discord.js"); 

module.exports = {
  config: {
    name: "info",
    description: "Obtenir les informations d'une commande.",
    usage: "info [command]",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Veuillez fournir un nom de commande.")
          .setColor("Red")
      ]
    });

    const command = client.prefix_commands.get(args[0].toLowerCase());

    if (!command) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription("Désolé, mais cette commande n'existe pas.")
          .setColor("Red")
      ]
    });

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Commande Information : ${command.config.name.toUpperCase()}`)
          .addFields(
            { name: 'Description:', value: command.config.description || "Aucune description n'a été fournie." },
            { name: 'Usage:', value: command.config.usage ? codeBlock('txt', command.config.usage) : "Aucun Usage n' été fourni." },
            { name: 'Permissions:', value: command.permissions.join(", ") },
            { name: 'Développeur uniquement ?', value: command.owner ? 'Oui' : 'Non' }
          )
          .setColor("Blue")
      ]
    });
  },
};