
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skip",
    category: "🎶 | Music",
    aliases: ["s"],
    cooldown: 3,
    useage: "skip",
    description: "Skips a track",
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
                    .setTitle(`❌ ERROR | I am not playing something`)
                    .setDescription(`The Queue is empty!`)
                );
            if (client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | Please join **my** Channel first`)
                    .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
                );
            message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle("⏭ Skipped the Current Track")
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

            client.distube.skip(message);
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