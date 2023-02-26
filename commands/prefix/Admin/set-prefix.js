const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "prefix",
    description: "Définissez le préfix du serveur.",
    usage: "prefix [nouveau prefix]"
  },
  permissions: ['Administrator'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Argument manquant")
        .setDescription("Veuillez fournir un nouveau préfix !")
    ]});

    if (args[0].length > 5) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Argument manquant")
        .setDescription("Désolé, mais la longueur du nouveau préfixe ne doit pas dépasser 5 caractères !")
    ]});

    const newPrefix = await db.set(`guild_prefix_${message.guild.id}`, args[0]);

    const finalEmbed = new EmbedBuilder()
      .setTitle("Succès !")
      .setDescription(`Nouveau préfixe pour ce serveur : \`${newPrefix}\`.`)
      .setColor("Green");

    return message.reply({ embeds: [finalEmbed] });
  },
};