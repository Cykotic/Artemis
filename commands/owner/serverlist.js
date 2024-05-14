const { MessageEmbed } = require('discord.js') 

module.exports = {
    name: "serverlist",
    aliases: ["sl"],
    category: "⛔ | Developer",
    usage: "Nothing rlly",
    ownerOnly: true, 
    description: `show's what server the bot in`,
    run: async (client, message, args) => {
   let serverlist = ''
        client.guilds.cache.forEach((guild) => {
            serverlist = serverlist.concat( " > " + "** ❯ **" + guild.name + " | ID: " + guild.id + ` | Members:`+ guild.memberCount + "\n"  )
        })
    
        const embed = new MessageEmbed()
        .setColor(0xff7700)
        .setTitle(`Servers that have ${client.user.username} Bot`, '')
        .setDescription(serverlist)
        .setFooter(`Total Servers: ${client.guilds.cache.size}`)
        .setTimestamp()
        message.channel.send({embed});
  }
}