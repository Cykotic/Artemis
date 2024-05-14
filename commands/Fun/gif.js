const { MessageEmbed } = require('discord.js');

const giphy = require('giphy-api')();

module.exports = {
    name: "gif",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",
    //cooldown: 10,
    run: async (client, message, args) => {

        if (args.length === 0) {
            message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`❌ ERROR | Please give argument to search`)
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        } else {
            
            if (args.length === 1) {
                term = args.toString()
            } else {
                term = args.join(" ");
            }

            giphy.search(term).then(function (res) {
                // Res contains gif data!
                let id = res.data[0].id
                let nigger = `https://media.giphy.com/media/${id}/giphy.gif`
                const embed = new MessageEmbed()
                    .setTitle(`Searched: "${term}"`)
                    .setColor(0xff7700)
                    .setImage(nigger)
                    .setURL(`${res.data[0].url}`)
                    .setTimestamp()
                    .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                message.channel.send(embed)

            })
        }
    }
}