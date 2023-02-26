const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "Avatar",
    type: 2,
    run: async (client, interaction, config, db) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Final :
        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${user.user.tag} avatar:`)
                        .setImage(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                ],
                ephemeral: true
            }
        );
    },
};