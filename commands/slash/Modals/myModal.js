const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "mymodal",
    description: "Répond avec un menu modal !",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const modal = new ModalBuilder()
            .setCustomId('monModal')
            .setTitle('Mon Modal');

        const something = new TextInputBuilder()
            .setCustomId('quelque chose')
            .setLabel("Tapez n'importe quoi ici")
            .setStyle(TextInputStyle.Short);

        const ActionRow = new ActionRowBuilder().addComponents(something);

        modal.addComponents(ActionRow);

        await interaction.showModal(modal);
    },
};