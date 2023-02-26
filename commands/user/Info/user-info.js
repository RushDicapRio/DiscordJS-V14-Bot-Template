const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "User Info",
    type: 2,
    run: async (client, interaction, config, db) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Serveur/gestionnaire de discord rejoint :
        const joinedAgoCalculator = {
            fetch: {
                user(userInput, type) {
                    if (!userInput) throw new ReferenceError("Vous n'avez pas fourni l'utilisateur à calculer.");

                    if (type === "discord") {
                        const joinedDiscordTimestampInNumber = new Date().getTime() - userInput.createdTimestamp;
                        const joinedDiscordTimestampInString = moment(userInput.user.createdAt).fromNow();

                        return joinedDiscordTimestampInString.toString(); // S'assurer juste que c'est de la ficelle.
                    } else if (type === "server") {
                        const joinedServerTimestampInNumber = new Date().getTime() - userInput.joinedTimestamp;
                        const joinedServerTimestampInString = moment(userInput.joinedAt).fromNow();

                        return joinedServerTimestampInString.toString(); // S'assurer juste que c'est de la ficelle.
                    } else throw new ReferenceError('Type invalide. Utilisez "discord" ou "serveur" uniquement.');
                }
            }
        };

        // Gestionnaire de type de bot :
        const bot = {
            true: "Oui",
            false: "Non"
        };

        // Gestionnaire d'accusés de réception :
        // L pour les développeurs Dyno
        const acknowledgements = {
            fetch: {
                user(userInput) {
                    let result;

                    try {
                        if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Membres du serveur";
                        if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Madérateurs du serveur";
                        if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Directeurs du serveur";
                        if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Administrateur du serveur";
                        if (userInput.id === interaction.guild.ownerId) result = "Créateur du serveur";

                    } catch (e) {
                        result = "Membres du serveur";
                    };

                    return result;
                }
            }
        };

        // Final :
        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${user.user.tag} information :`)
                        .setThumbnail(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                        .addFields(
                            {
                                name: "Nom complet",
                                value: `${user.user.tag}`,
                                inline: true
                            },
                            {
                                name: "Identification",
                                value: `\`${user.id}\``,
                                inline: true
                            },
                            {
                                name: `Roles [${user.roles.cache.size - 1}]`, // Utilisez "-1" car nous avons supprimé le rôle "@tout le monde"
                                value: `${user.roles.cache.map((ROLE) => ROLE).join(' ').replace('@everyone', '') || "[Pas de rôles]"}`,
                                inline: true
                            },
                            {
                                name: "A rejoint le serveur le",
                                value: `${new Date(user.joinedTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "server")})`,
                                inline: true
                            },
                            {
                                name: "A rejoin discord le",
                                value: `${new Date(user.user.createdTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "discord")})`,
                                inline: true
                            },
                            {
                                name: "Est-ce un bot ?",
                                value: `${bot[user.user.bot]}`,
                                inline: true
                            },
                            {
                                name: "Remerciements",
                                value: `${acknowledgements.fetch.user(user)}`
                            }
                        )
                        .setColor('Blue')
                ],
                ephemeral: true
            }
        );
    },
};