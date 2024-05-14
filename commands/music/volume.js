
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "volume",
    category: "🎶 | Music",
    aliases: ["vol"],
    cooldown: 4,
    useage: "volume <0-150>",
    description: "Changes volume of the BOT!",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
            if (!channel)
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | Please join a Channel first`)
                );
            if (!client.distube.getQueue(message))
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | I am not playing Something`)
                    .setDescription(`The Queue is empty`)
                );
            if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | Please join **my** Channel first`)
                    .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
                );
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | You didn't provided a Loop method`)
                    .setDescription(`Current Volume: \`${client.distube.getQueue(message).volume}%\`\nUsage: \`${prefix}volume <0-150>\``)
                );

            if (!(0 <= Number(args[0]) && Number(args[0]) <= 500))
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | Volume out of Range`)
                    .setDescription(`Usage: \`${prefix}volume <0-150>\``)
                );

            client.distube.setVolume(message, Number(args[0]));
            return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`🔊 Changed the Volume to: \`${args[0]}%\``)
            );
        } catch (e) {
            console.log(String(e.stack).bgRed)
            return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.stack}\`\`\``)
            );
        }
    }
}