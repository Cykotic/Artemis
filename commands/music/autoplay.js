
const { MessageEmbed } = require("discord.js");
const { format } = require("../../handlers/functions")

module.exports = {
    name: "autoplay",
    category: "🎶 | Music",
    aliases: ["ap"],
    cooldown: 4,
    useage: "autoplay",
    description: "Toggles Autoplay",
    run: async (client, message, args, cmduser, text, prefix) => {
        try {
            const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
            if(!channel)
              return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`❌ ERROR | Please join a Channel first`)
              );
            if(!client.distube.getQueue(message))
              return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`❌ ERROR | I am not playing Something`)
                .setDescription(`The Queue is empty`)
              );
            if(client.distube.getQueue(message) && channel.id !== message.guild.me.voice.channel.id)
              return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle(`❌ ERROR | Please join **my** Channel first`)
                .setDescription(`Channelname: \`${message.guild.me.voice.channel.name}\``)
              );
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`✅ Successfully toggled Autoplay! It's now: ${client.distube.toggleAutoplay(message) ? "ON" : "OFF"}`)
            ).then(msg=>msg.delete({timeout: 10000}).catch(e=>console.log(e.message)))
          } catch (e) {
              console.log(String(e.stack).bgRed)
              return message.channel.send(new MessageEmbed()
                  .setColor(0xff7700)
                  .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                  .setTimestamp()
                  .setTitle(`❌ ERROR | An error occurred`)
                  .setDescription(`\`\`\`${e.stack}\`\`\``)
              );
          }
        }
      }