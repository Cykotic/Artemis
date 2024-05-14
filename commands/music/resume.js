
const { MessageEmbed } = require("discord.js");
const { delay } = require("../../handlers/functions");

module.exports = {
    name: "resume",
    category: "🎶 | Music",
    aliases: ["r"],
    cooldown: 4,
    useage: "shuffle",
    description: "Resumes the Song",
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
            if (client.distube.isPlaying(message))
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTitle(`❌ ERROR | Cannot resume the Song`)
                    .setDescription(`It's not paused, so I cant!`)
                );
            message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle("▶ Resumed the Song")
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            client.distube.resume(message)
            // those 4 lines with the delay, fixes the bug that it doesn't resume by pausing and resuming
            await delay(100);
            client.distube.pause(message);
            await delay(100);
            client.distube.resume(message);
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