const { EmbedBuilder } = require("discord.js");

module.exports = {
    id: "myModal",
    run: async (client, interaction, config, db) => {

        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Les modaux fonctionnent ! Voici ce que vous avez tapé : ' + interaction.fields.getTextInputValue('something'))
            ],
            ephemeral: true
        });
    },
};