const { MessageEmbed } = require("discord.js");
const jokes = require("one-liner-joke").getRandomJoke;

module.exports = {
  name: "joke",
  description:"Placeholdment",
  category: "🎮 | Fun",
  
run: async (client, message, args) => {

    const joke = jokes({ exclude_tags: ["dirty", "racist", "marriage", "death"] })
      .body;
    const jokeLol = new MessageEmbed()
      .setColor(0xff7700)
      .setTitle(joke)
      .setTimestamp()
      .setFooter(message.author.tag, message.member.user.displayAvatarURL())
    message.channel.send(jokeLol);

    message.delete()
    }
  }