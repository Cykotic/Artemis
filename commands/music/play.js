
const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json") 
const { getTracks, getPreview } = require("spotify-url-info")
module.exports = {
    name: "play",
    category: "🎶 | Music",
    aliases: ["p", "playsong", "playtrack"],
    cooldown: 4,
    useage: "play <URL / TITLE>",
    description: "PLays a song from youtube",
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
            if (client.distube.isPlaying(message) && channel.id !== message.guild.me.voice.channel.id)
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | Please join **my** channel first`)
                    .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
                );
            if (!args[0])
                return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                    .setTimestamp()
                    .setTitle(`❌ ERROR | You didn't provided a Searchterm`)
                    .setDescription(`Usage: \`${prefix}search <URL / TITLE>\``)
                );
            message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle("Searching Song")
                .setDescription(`\`\`\`fix\n${text}\n\`\`\``)
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            //https://open.spotify.com/track/5nTtCOCds6I0PHMNtqelas
            if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("track")) {
                getPreview(args.join(" ")).then(result => {
                    client.distube.play(message, result.title);
                })
            }
            else if (args.join(" ").toLowerCase().includes("spotify") && args.join(" ").toLowerCase().includes("playlist")) {
                getTracks(args.join(" ")).then(result => {
                    for (const song of result)
                        client.distube.play(message, song.name);
                })
            }
            else {
                client.distube.play(message, text);
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