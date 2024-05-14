
const { MessageEmbed } = require('discord.js');
const superagent = require('superagent');


module.exports = {
  name: "pat",
  category: "🔍 | Information",
  ownerOnly: false,
  usage: "Nothing",
  description: "Nothing",

  run: async (client, message, args) => {

    let victim = message.mentions.users.first() || (args.length > 0 ? message.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first() : message.author) || message.author;
    if (!victim) return message.reply("Make sure you mention someone!");

    const { body } = await superagent
      .get("https://nekos.life/api/v2/img/pat");
    const embed = new MessageEmbed()
      .setColor(0xff7700)
      .setTitle("Here's your Pat 👀")
      .setDescription(`${victim} Pats ${message.author}`)
      .setImage(body.url)
      .setTimestamp()
      .setFooter(message.author.tag, message.member.user.displayAvatarURL())

    message.channel.send(embed);
  }
}