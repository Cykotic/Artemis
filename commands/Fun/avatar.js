const Discord = require('discord.js');

module.exports = {
    name : 'avatar',
    category: "🎮 | Fun",
    run : async(client, message, args) => {

const user = message.mentions.users.first() || message.member.user

if (!args[0]) return message.channel.send({
    embed: {
        description: "please mention someone.",
        color: 0xff7700,
    }
})
let avatarembed = new Discord.MessageEmbed()
.setTitle(`${user.tag} Avatar`)
.setColor(0xff7700)
.setDescription(`
Link as:
- [png](${user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 })})
- [jpg](${user.displayAvatarURL({ format: 'jpg', dynamic: true, size: 1024 })})
- [webp](${user.displayAvatarURL({ format: 'webp', dynamic: true, size: 1024 })})
`)

.setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
.setTimestamp()

return message.channel.send(avatarembed)

    }
}