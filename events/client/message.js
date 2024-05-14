const { ownerID, prefix } = require("../../config.json");
const Blacklist = require('../../models/blacklist-schema');
const Schema = require("../../models/chatbot-schema");
const { chatBot } = require("reconlx");
const { MessageEmbed, Collection } = require("discord.js");
const afk = require("../../models/afk-schema");
const db = require("../../models/command-schema");

module.exports = async (client, message) => {

  /* part of the chat bot commands in setchatbot.js */
  if (message.author.bot || !message.guild) return;
  Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
    if (!data) return;
    if (message.channel.id !== data.Channel) return;
    if (message.attachments.size > 0) return;
    if (message.content.includes('@here')) return;
    if (message.content.includes('@everyone')) return;
    chatBot(message, message.content, message.author.id);
  })

  /* mainly just for the memes */
  if (message.content == "F") {
    message.reply("has paid respects!");
  }

  /* afk command function */
  if (message.mentions.members.first()) {
    const afklist = await afk.findOne({ userID: message.mentions.members.first().id, serverID: message.guild.id });
    if (afklist) {

      await message.guild.members.fetch(afklist.userID).then(member => {
        let user_tag = member.user.tag;
        return message.channel.send(`**${afklist.oldNickname || user_tag || member.user.username}** is currently afk: ${afklist.reason} **- ${moment(afklist.time).fromNow()}**`).catch(() => { });
      });
    }
  }
  const afklis = await afk.findOne({ userID: message.author.id, serverID: message.guild.id });

  /* afk function */
  if (afklis) {
    let nickname = `${afklis.oldNickname}`;
    message.member.setNickname(nickname).catch(() => { });
    await afk.deleteOne({ userID: message.author.id });
    return message.channel.send(
      new MessageEmbed()
        .setColor('0xff7700')
        .setDescription(`**Reason:** "${afklis.reason}"`)
        .setColor(0xff7700)
        .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
        .setTitle(`It seems like you've came back! I removed your afk`)).then(m => {
          setTimeout(() => {
            m.delete().catch(() => { });
          }, 10000);
        });

  };

  /* the prefix system along ith aliases, or what i like to call the prefix system */
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.members.fetch(message);
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) return;
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (!command) return;

  /* blacklist command return the function as "none" */
  let profile = await Blacklist.findOne({ userID: message.author.id });
  if (profile) return


  /* OwnerID handler */
  if (command.ownerOnly) {
    if (message.author.id !== ownerID)
      return message.channel.send
        (
          new MessageEmbed()
            .setColor(0xff7700)
            .setTimestamp()
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            .setTitle("❌ Error | You are not the developer of this bot!")
        ).then(msg => msg.delete({ timeout: 10000 }))
  }

  /* permission handler */
  if (command.memberpermissions && !message.member.hasPermission(command.memberpermissions)) {
    return message.channel.send
      (
        new MessageEmbed()
          .setColor(0xff7700)
          .setTimestamp()
          .setFooter(message.author.tag, message.member.user.displayAvatarURL())
          .setTitle("❌ Error | You are not allowed to run this command!")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(`Missing Permissions: \`${command.memberpermissions}\``))
      .then(msg => msg.delete({ timeout: 5000 }))
  }

  /* nsfw command handler*/
  if (command.nsfwOnly && !message.channel.nsfw && message.guild) {
    return message.channel.send(new MessageEmbed()
      .setColor(0xff7700)
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
      .setTimestamp()
      .setTitle("❌ ERROR | **You can only use this command in NSFW!**")
    ).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
  }


  /* cooldown handler */
  if (command) {
    if (!client.cooldowns.has(command.name)) { client.cooldowns.set(command.name, new Collection()) }
    const now = Date.now(); const timestamps = client.cooldowns.get(command.name); const cooldownAmount = (command.cooldown || 1.5) * 1000; if (timestamps.has(message.author.id)) { const expirationTime = timestamps.get(message.author.id) + cooldownAmount; if (now < expirationTime) { const timeLeft = (expirationTime - now) / 1000; return message.channel.send(new MessageEmbed().setColor(0xff7700).setTimestamp().setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`).setTitle(`❌ Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`)).then(msg => msg.delete({ timeout: 2000 })); } } timestamps.set(message.author.id, now); setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    /* part of enable and disable command in folder */
    if (command) {
      const check = await db.findOne({ Guild: message.guild.id })
      if (check) {
        if (check.Cmds.includes(command.name)) return message.channel.send(new MessageEmbed().setColor(0xff7700).setTimestamp().setFooter(message.author.tag, message.member.user.displayAvatarURL()).setTitle("❌ Error | This command has been disabled by owner!")).then(msg => msg.delete({ timeout: 10000 }));
        command.run(client, message, args, message.member, args.join(" "));
      } else {
        command.run(client, message, args, message.member, args.join(" "));
      }
    }
  }
}