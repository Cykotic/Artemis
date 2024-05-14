const { MessageEmbed } = require("discord.js");
const { prefix } = require("../../config.json")

module.exports = {
  name: "help",
  description: "Returns all Commands, or one specific Command information",
  usage: "[command], [aliases], [command <cmd>]",
  aliases: ["h", "cmds"],
  category: "⚙️ | utility",

  run: async (client, message, args) => {
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      await message.delete()
      if (!command) {
        return message.channel.send(new MessageEmbed()
        .setColor(0xff7700)
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        .setTitle(`❌ Error | Unknown Command: \`${args[0]}\``)
        ).then(msg => msg.delete({timeout: 10000}))}
      
      
        const embed = new MessageEmbed()
      
      info = "";
      if(command.name) info += `**Command name:**: \`${command.name}\`\n`
      if(command.aliases) info += `**Aliases**: \`${command.aliases.map(a => `${a}`).join("\`, \`")}\`\n`
      if(command.description) info += `**Description:**: \`${command.description}\`\n`
      if(command.usage) {
          info += `\n**Usage:**: \`${command.usage}\``
      }
      if(command.example) {
        info += `\n**Example:**: \`${command.example}\``
    }
      return message.channel.send
      (
        new MessageEmbed()
        .setColor("ORANGE")
        .setDescription(info)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        .setTimestamp()
        )
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setTitle(`❔❔ Need Help?, Here are all of my commands:`)
        .setDescription(`Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example:  \`${prefix}help ban\``,)
        .setColor(0xff7700)
        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        .setTimestamp()
        .setThumbnail(client.user.displayAvatarURL());

      let com = {}
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = value.join(", ");

        emx.addField(` ${category.toUpperCase()} [${value.length}]`, `${desc}`, inline=false);
      } 
      return message.channel.send(emx);
    }
  }
};