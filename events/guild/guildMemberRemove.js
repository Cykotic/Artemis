const { MessageAttachment } = require('discord.js')
const Schema = require("../../models/welcome-schema")
const canvas = require('discord-canvas')

/**
 * 
 * @param {*} client 
 * @param { GuildMember } member
 *
 */

module.exports = async (client, member) => {
    Schema.findOne({ Guild: member.guild.id }, async (e, data) => {
        if (!data) return;

    /* canvas system show's when a new member leaves the guild */
    const user = member.user;
    const image = await new canvas.Goodbye()
    .setUsername(user.username)
    .setDiscriminator(user.discriminator)
    .setMemberCount(member.guild.memberCount)
    .setGuildName(member.guild.name)
    .setAvatar(user.displayAvatarURL({ format: "png" }))
    .setColor("border", "#000000")
    .setColor("username-box", "#000000")
    .setColor("discriminator-box", "#000000")
    .setColor("message-box", "#000000")
    .setColor("title", "#ff7700")
    .setColor("avatar", "#ff7700")
    .setBackground(
      "https://cdn.discordapp.com/attachments/425261854558912512/820566960077013012/1594a6d06fe8d0c080827d65d054b272.png"
      )
      .toAttachment();

      const attachment = new MessageAttachment(
          image.toBuffer(), 
          "goodbye-image.png"
          );

          const channel = member.guild.channels.cache.get(data.Channel);
          channel.send(attachment)
        });      
    } ;