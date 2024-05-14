const muteSchema = require('../../models/mute-schema')
const { prefix } = require("../../config.json")

module.exports = {
  name: "mute",
  category: "🔨 | Moderation",
  memberpermissions: ['MUTE_MEMBERS'],
  description: "mute a member in the server",
  usage: `${prefix}mute @member`,
  example: `${prefix}mute @timmy#1234`,
  run: async (client, message, args) => {

    // !mute @ reason

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!Member) return message.channel.send('Member is not found.')
    const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted')
    if (!role) {
      try {
        message.channel.send('Muted role is not found, attempting to create muted role.')

        let muterole = await message.guild.roles.create({
          data: {
            name: 'muted',
            permissions: []
          }
        });
        message.guild.channels.cache.filter(c => c.type === 'text').forEach(async (channel, id) => { await channel.createOverwrite(muterole, { SEND_MESSAGES: false, ADD_REACTIONS: false })});
        message.channel.send('Muted role has sucessfully been created.')
      } catch (error) {
        console.log(error)
      }
    };
    let role2 = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted')
    if (Member.roles.cache.has(role2.id)) return message.channel.send(`${Member.displayName} has already been muted.`)
    await Member.roles.add(role2)
    muteSchema.findOne({ Guild: message.guild.id }, async (err, data) => {
      if (!data) {
        new muteSchema({
          Guild: message.guild.id,
          Users: Member.id,
        }).save();
      } else {
        data.Users.push(Member.id);
        data.save();
      }
    })
    message.channel.send({
      embed: {
        description: `${Member.displayName} is now muted.`,
        color: 0xff7700,
      }
    })
  }
}