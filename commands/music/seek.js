
const { MessageEmbed } = require("discord.js");
const { format } = require("../../handlers/functions")

module.exports = {
    name: "seek",
    category: "🎶 | Music",
    aliases: ["r"],
    cooldown: 4,
    useage: "seek <Pos. in Seconds>",
    description: "Seek to a position in the track <Seconds>",
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
                    .setTitle(`❌ ERROR | You didn't provided a Time you want to seek to!`)
                    .setDescription(`Usage: \`${prefix}seek 10\``)
                )

            let seektime = Number(args[0])

            if (seektime < 0)
                seektime = 0;

            if (seektime >= client.distube.getQueue(message).songs[0].duration)
                seektime = client.distube.getQueue(message).songs[0].duration - 1;


            client.distube.seek(message, seektime * 1000);

            message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTitle(`⏩ Seeking to: ${format(seektime)}`)
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

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