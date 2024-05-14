
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "loop",
    category: "🎶 | Music",
    aliases: ["repeat"],
    cooldown: 4,
    useage: "loop <0/1/2>",
    description: "Changes loop from off/song/queue !",
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
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | You didn't provided a Loop method`)
                    .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
                );
            let loopstate = args[0].toString();
            if (loopstate.toLowerCase() === "song") loopstate = "1";
            if (loopstate.toLowerCase() === "queue") loopstate = "2";
            if (loopstate.toLowerCase() === "off") loopstate = "0";
            if (loopstate.toLowerCase() === "track") loopstate = "1";
            if (loopstate.toLowerCase() === "q") loopstate = "2";
            if (loopstate.toLowerCase() === "qu") loopstate = "2";
            if (loopstate.toLowerCase() === "disable") loopstate = "0";
            loopstate = Number(loopstate);

            loopstate = Number(loopstate);
            loopstates = {
                "0": "off",
                "1": "song",
                "2": "queue"
            }
            if (0 <= loopstate && loopstate <= 2) {
                client.distube.setRepeatMode(message, parseInt(loopstate));
                message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTitle(`🔁 Changed Repeat mode to: \`${loopstates[loopstate]}\``)
                ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            }
            else {
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTitle(`❌ ERROR | You didn't provided a Loop method`)
                    .setDescription(`Usage: \`${prefix}loop <0/1/2>\``)
                );
            }

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