const { MessageEmbed } = require("discord.js");
const superagent = require("snekfetch")

module.exports = {
    name: "bj",
    category: "🍆 | NSFW",
    description: "send a bj image",
    cooldown: 3,
    run: async (client, message, args) => {

        if (!message.channel.nsfw) {
            return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle("❌ ERROR | **You can only use this command in NSFW!**")
            ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        } else {
            superagent.get('https://nekos.life/api/v2/img/bj').end((err, response) => {
                return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setImage(response.body.url)
                ).catch(e => console.log(e.message))
            })
        }
    },
};