const Discord = require('discord.js')

module.exports = {
    name: "snipe",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",

    run: async (client, message, args) => {
        
    const msg = client.snipes.get(message.channel.id);
    if(!msg) return message.channel.send({ embed: { color: 0xff7700, description: "There is nothing to snipe" }}).then(msg => msg.delete({ timeout: 5000 }));

    await message.delete()
    const embed = new Discord.MessageEmbed()
    .setColor(0xff7700)
    .setDescription(msg.content)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(msg.author.tag, msg.member.user.displayAvatarURL())
    .setTimestamp();
    message.channel.send(embed)

    }
}