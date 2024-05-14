const { prefix } = require("../../config.json")

module.exports = {
  name: "ban",
  category: "🔨 | Moderation",
  ownerOnly: false,
  description: "ban a member out the server",
  aliases: ["b", "bann"],
  memberpermissions: ['BAN_MEMBERS'],
  usage: `${prefix}ban @member [reason] | ${prefix}ban ID [reason]`,
  example: `${prefix}ban @timmy#6545 [reason]`,
  run: async (client, message, args) => {

    /* mention member check */
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
    if (!member) return message.reply({ embed: { description: "**Please mention a member or ID to ban!** ", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));
  
    /* member postion check */
    if (message.mentions.members.first().roles.highest.position > message.guild.members.resolve(bot.user).roles.highest.position)
    return message.channel.send({ embed: { description: "**The member has a higher position than you**", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));

    /* ban member function */
    if (message.guild.members.cache.has(member.id)) {
      let reason = `Banned by ${message.author.tag}`
      if (args[1]) reason = args.splice(1).join(" ") || "No Reason Provided"
      message.guild.members.ban(member, { reason })
      message.channel.send({ embed: { description: `**${member.user.tag}** was banned`, color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));

    } else {

      /* ban member by id function */
      let reason = `Banned by ${message.author.tag}`
      if (args[1]) reason = args.splice(1).join(" ")
      message.guild.members.ban(member, { reason })
      message.channel.send({ embed: { description: `**${member.tag}** was banned`, color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));

    }
  }
}