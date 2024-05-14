const DIG = require("discord-image-generation");
const { MessageAttachment } = require("discord.js");

module.exports = {
    name: 'affect',
    description: 'this won\'t affect my baby!',
    category: "🖼️ | Image",
    ownerOnly: false,
    usage: "Nothing",

    run: async (client, message, args) => {

   
 let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
 let m = await message.channel.send("**Please Wait...**");   
 let avatar = user.user.displayAvatarURL({
      dynamic: false,
      format: "png",
    });

    let img = await new DIG.Affect().getImage(avatar);

    let attach = new MessageAttachment(img, "thomas.png");
    m.delete({ timeout: 5000 });
    message.channel.send(attach);
  },
};