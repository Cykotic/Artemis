const { MessageEmbed } = require('discord.js')


module.exports = {
    name: "nuke",
    category: "🔨 | Moderation",
    ownerOnly: false,
    description: "nukes the channel and then makes a new one",
    aliases: ["nc"],
    memberpermissions: ['MANAGE_CHANNELS'],
    run: async (client, message, args) => {

        if (!message.channel.deletable) {
            return message.reply("This channel cannot be nuked! what are you thinking?")
        }
        message.channel.clone().then((channel)=> {
            channel.setParent(message.channel.parent.id)
            channel.setPosition(message.channel.position)
            
           const embed = new MessageEmbed()
           .setTitle(`\`${message.channel.name}\` **has been NUKED**`)
           .setColor("0xff7700")
           .setImage('https://media1.tenor.com/images/953c50b25f0661d2267c968730b5ae36/tenor.gif')
           return channel.send(embed).then(msg => {msg.delete({ timeout: 10000 })}).catch(console.error)})
            }
        }
        