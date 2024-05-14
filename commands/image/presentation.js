
const DIG = require("discord-image-generation");
const { MessageAttachment } = require("discord.js");

module.exports = {
  name: 'presentation',
  category: "🖼️ | Image",
  ownerOnly: false,
  usage: "Nothing",

  run: async (client, message, args) => {
    let m = await message.channel.send("**Please Wait...**");
    let text = args.join(" ");
    let img = await new DIG.LisaPresentation().getImage(text);

    let attach = new MessageAttachment(img, "presentation.png");
    m.delete({ timeout: 5000 });
    message.channel.send(attach);
  },
};