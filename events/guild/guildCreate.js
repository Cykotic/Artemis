const { MessageEmbed } = require("discord.js");
const logChannels = '834356039331610654';


/**
 * 
 * @param {*} client 
 * @param { GuildMember } member
 *
 */

/* logs the server when the bot joins a new guild */
 module.exports = async (client, guild) => {
    client.channels.cache.get(logChannels).send(
        new MessageEmbed()
        .setTitle("NEW SERVER!")
        .setColor(0xff7700)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .addField("Guild Info:",[
            `> ❯ Guild Name: **${guild.name}**`,
            `> ❯ Guild Id: **${guild.id}**`,
            `> ❯ Guild Members: **${guild.memberCount}**`,
        ])
        .addField("Owner Info:",[
            `> ❯ Guild Owner: **${guild.owner}**`,
            `> ❯ Owner Id: **${guild.owner.id}**`,
        ])
        .addField("Guilds:",[
            `> ❯ Currently in: **${client.guilds.cache.size} Guilds**`,
        ])
    )
 }