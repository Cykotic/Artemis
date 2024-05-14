const { prefix } = require("../../config.json")

module.exports = {
  name: "kick",
  category: "🔨 | Moderation",
  description: "kick a member out the server",
  aliases: ["k", "kc"],
  memberpermissions: ['KICK_MEMBERS'],
  usage: `${prefix}kick @member [reason]`,
  example: `${prefix}kick @timmy#6545 [reason]`,
  run: async (client, message, args) => {

    /* mention member check */
    let member = message.guild.members.cache.get(args[0]) || message.mentions.members.first()
    if (!member) return message.reply({ embed: { description: "**Please mention a member to kick!** ", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));

    /* member postion check */
    if (member.roles.highest.comparePositionTo(message.member.roles.highest) < 1)
      return message.channel.send({ embed: { description: "**The member has a higher position than you**", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));
    
      /* kick member function*/
    let reason = `Kick by ${message.author.tag}`
    if (args[1]) reason = args.splice(1).join(" ")
    message.guild.target.kick(person, { reason: reason })
    message.channel.send({ embed: { description: `**${person.tag}** was kicked.`, color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));
  }
}