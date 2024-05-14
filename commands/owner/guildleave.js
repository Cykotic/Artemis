const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "guildleave",
    category: "⛔ | Developer",
    ownerOnly: true,
    aliases: ['ggl'],
    usage: "guildleave <id>",
    description: "makes the bot leave the desire guild",
    run: async (client, message, args) => {

        guild = client.guilds.cache.find(val => val.id === args.join(' '))
        guild.leave();
        
        return message.channel.send(new MessageEmbed()
            .setColor(0xff7700)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }))
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            .setTitle("Server Left Successfully!")
        ).then(msg => msg.delete({ timeout: 10000 }));
    }
};