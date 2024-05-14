
const { MessageEmbed, Collection } = require("discord.js");
module.exports = {
    name: "search",
    category: "🎶 | Music",
    aliases: ["findtrack"],
    cooldown: 4,
    useage: "search <URL / TITLE>",
    description: "searches 10 songs from youtube",
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
                    .setDescription(`Usage: \`${prefix}play <URL / TITLE>\``)
                );
                let result = await client.distube.search(args.join(" "));
                let searchresult = ""
                for(let i = 0; i < 10; i++) {
                    try {
                        searchresult += `**${i+1}.** [${result[i].name}](${result[i].url}) - \`${result[i].formattedDuration}\`\n`
                    } catch {
                        searchresult = "\n";

                    }
                }

            message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`Searchresult for: ${args.join(" ")}`.substr(0, 256))
                .setDescription(searchresult.substr(0, 2048))
            ).then(msg => {
                msg.channel.awaitMessages(m => m.author.id === message.author.id, {max: 1, time: 60000, errors: ["time"]}).then(collected => {
                    let userinput = collected.first().content;
                    if(Number(userinput) <= 0 && Number(userinput) > 10) {
                        message.reply("NOT A VALID NUMBER, so i played the **FIRST TRACK**")
                        userinput - 0;
                    }
                    client.distube.play(message, result[userinput - 1].url);
                }).catch(e => {
                    console.log(String(e.stack).bgRed)
                    return message.channel.send(new MessageEmbed()
                    .setColor(0xff7700)
                    .setTitle(`❌ ERROR | An error occurred | Time ran out`)
                    .setDescription(`\`\`\`${e.message}\`\`\``)
                    );
                })
            })
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