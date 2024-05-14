const { MessageEmbed, MessageAttachment } = require("discord.js");
  const Meme = require("memer-api");
  const memer = new Meme();
  
  module.exports = {
    name: "changemymind",
    aliases: [""],
    category: "🖼️ | Image",
    description: "IMAGE CMD",
    usage: "changemymind <TEXT>",
    run: async (client, message, args, cmduser, text, prefix) => {
        //send loading message
        var tempmsg = await message.channel.send(new MessageEmbed()
          .setColor(0xff7700)
          .setAuthor("Getting Image Data..", "https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif")
        );
        //get the additional text
        var text = args.join(" ");
        //If no text added, return error
        if(!text) return tempmsg.edit(tempmsg.embeds[0]
          .setTitle(":x: You did not enter a Valid Text!")
          .setColor(0xff7700)
          .setDescription(`Useage: \`${prefix}changemymind <TEXT>\``)
        ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
        
        //get the memer image
        memer.changemymind(text).then(image => {
          //make an attachment
          var attachment = new MessageAttachment(image, "changemymind.png");
          //delete old message
          tempmsg.delete();
          //send new Message
          message.channel.send(tempmsg.embeds[0]
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setImage("attachment://changemymind.png")
            .attachFiles(attachment)
          ).catch(e => console.log("Couldn't delete msg, this is for preventing a bug".gray))
        })
        
    }
  }
  /**
   * @INFO
   * Bot Coded by Tomato#6966 | https://github.com/Tomato6966/discord-js-lavalink-Music-Bot-erela-js
   * @INFO
   * Work for Milrato Development | https://milrato.eu
   * @INFO
   * Please mention Him / Milrato Development, when using this Code!
   * @INFO
   */