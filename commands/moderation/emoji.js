const { Util, MessageEmbed } = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
  name: "stealemoji",
  category: "🔍 | Information",
  aliases: ['addemoji', 'se', 'am'],
  description: "Steal an emoji from a different server",
  memberpermissions: ["MANAGE_EMOJIS"],
  run: async (client, message, args) => {

    const emoji = args[0];
    const name = args.slice(1).join(" ");
    if (!emoji) {
      return message.channel.send(
        `Please Give Me A Emoji!`
      );
    }

    try {
      if (emoji.startsWith("https://cdn.discordapp.com")) {
        await message.guild.emojis.create(emoji, name || "give_name");

        const embed = new MessageEmbed()
          .setTitle(`Emoji Added`)
          .setThumbnail(`${emoji}`)
          .setColor(0xff7700)
          .setDescription(`Emoji Has Been Added! | Name: ${name || "give_name"} `);
        return message.channel.send(embed);
      }

      const customEmoji = Util.parseEmoji(emoji);

      if (customEmoji.id) {
        const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${customEmoji.animated ? "gif" : "png"
          }`;

        await message.guild.emojis.create(
          `${link}`,
          `${name || `${customEmoji.name}`}`
        );

        const embed = new MessageEmbed()
          .setTitle(`Emoji Has Been Added! | Name: ${name || `${customEmoji.name}`}`)
          .setColor(0xff7700)
          .setThumbnail(`${link}`)
          //.setDescription(`\`Preview: [Click me](${link}\``)
          .setTimestamp()
          .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        return message.channel.send(embed);
      } else {
        const foundEmoji = parse(emoji, { assetType: "png" });
        if (!foundEmoji[0]) {
          return message.channel.send("Please provide a valid emoji. I can't work with this bs");
        }

        message.channel.send(
          "This is a normal emoji what you can use anywhere"
        );
      }
    } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Maximum number of emojis reached (50)"
        )
      ) {
        return message.channel.send(
          "Maximum emoji count reached for this Server!"
        );
      }
    }
  },
};