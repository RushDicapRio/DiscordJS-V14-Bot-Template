const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "", // Nom de la commande
    description: "", // Description de la commande
    type: 1, // Type de commande
    options: [], // Options de la commande
    permissions: {
        DEFAULT_PERMISSIONS: "", // Autorisations client nécessaires
        DEFAULT_MEMBER_PERMISSIONS: "" // Autorisations utilisateur requises
    },
    run: async (client, interaction, config, db) => {
        // code
    },
};