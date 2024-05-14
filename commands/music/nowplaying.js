const { MessageEmbed } = require("discord.js");
const { format, createBar } = require("../../handlers/functions")
module.exports = {
    name: "nowplaying",
    category: "🎶 | Music",
    aliases: ["np"],
    cooldown: 4,
    useage: "nowplaying",
    description: "Shows current Track information",
    run: async (client, message, args, cmduser, text, prefix) => {
    try{
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
      let queue = client.distube.getQueue(message);
      let track = queue.songs[0];
      message.channel.send(new MessageEmbed()
        .setColor(0xff7700)
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setTimestamp()
        .setTitle(`Now playing :notes: ${track.name}`.substr(0, 256))
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .addField("Views", `▶ ${track.views}`,true)
        .addField("Dislikes", `:thumbsdown: ${track.dislikes}`,true)
        .addField("Likes", `:thumbsup: ${track.likes}`,true)
        .addField("Duration: ", createBar(queue.currentTime))
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