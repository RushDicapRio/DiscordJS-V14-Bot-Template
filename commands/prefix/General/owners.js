const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "owners",
    description: "Réponses avec les propriétaires enregistrés uniquement.",
  },
  permissions: ['SendMessages'], // Étant donné que le "propriétaire" est TRUE, nous pouvons définir les autorisations sur "sendMessages".
  owner: true,
  run: async (client, message, args, prefix, config, db) => {
    
    const ownersID = config.Users.OWNERS;
    if (!ownersID) return;
    
    const ownersARRAY = [];
    
    ownersID.forEach(Owner => {
      const fetchedOWNER = message.guild.members.cache.get(Owner);
      if (!fetchedOWNER) ownersARRAY.push("*Utilisateur inconnu#0000*");
      ownersARRAY.push(`${fetchedOWNER}`);
    });

    message.reply({ embeds: [
      new EmbedBuilder()
        .setDescription(`Seuls les propriétaires commandent ! \nPropriétaires : **${ownersARRAY.join(", ")}**`)
        .setColor("Yellow")
    ] })
    
  },
};