const Meme = require("memer-api");
const memer = new Meme();
const Discord = require("discord.js");

module.exports = {
  name: "shit",
  description: "shit",
  usage: "shit <msg>",
  category: "🖼️ | Image",
  run: async (client, message, args) => {
      
    if (!args.length) {
      return message.channel.send("Please give the a msg");
    }

    let text = message.content
      .split(" ")
      .slice(1)
      .join(" ");

    let image = await memer.shit(text);
    let attachment = new Discord.MessageAttachment(image, "shit.png");
    message.channel.send(attachment);
  }
};