const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "simprate",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",
    cooldown: 5,
    run : async(client, message, args) => {

        let user;
        if(!message.mentions.users.first()) {user = message.author;}
        else{ user = message.mentions.users.first();}
        const rate = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        const embed = new MessageEmbed()
            .setColor(0xff7700)
            .setTitle(`**${user.username}** is \`${rate}% simp\``)
            .setFooter(message.author.tag, message.author.displayAvatarURL())
        message.channel.send(embed);

    }
}