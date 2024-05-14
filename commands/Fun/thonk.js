const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "thonk",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",

    run: async (client, message, args) => {

        let thonk = new MessageEmbed()
            .setColor(0xff7700)
            .setImage("https://media.discordapp.net/attachments/291967292453945344/558644298359504906/1549579041993.gif")
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        message.channel.send(thonk)

        message.delete();
    }
}