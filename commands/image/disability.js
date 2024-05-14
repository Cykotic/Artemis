const Meme = require("memer-api");
const memer = new Meme();
const Discord = require("discord.js");

module.exports = {
  name: "disability",
  description: "disability!",
  usage: "disability",
  category: "🖼️ | Image",
  run: async (client, message, args) => {
    const user = message.mentions.users.first() || message.member.user

    if (!args[0]) return message.channel.send({
        embed: {
            description: "please mention someone.",
            color: 0xff7700,
        }
    })
    let av = user.displayAvatarURL({ format: "png" });
    let image = await memer.disability(av);
    let attachment = new Discord.MessageAttachment(image, "disability.png");
    message.channel.send(attachment);
  }
};