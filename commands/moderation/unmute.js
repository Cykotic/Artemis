const { prefix } = require("../../config.json")
const muteSchema = require('../../models/mute-schema')

module.exports = {
  name: "unmute",
  category: "🔨 | Moderation",
  memberpermissions: ['MUTE_MEMBERS'],
  description: "unmute the muted member",
  usage: `${prefix}mute @member`,
  example: `${prefix}mute @timmy#1234`,
  run: async (client, message, args) => {

    /* unmute <member> */

    const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if (!Member) return message.channel.send('Member not found')
    const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

    muteSchema.findOne({
      Guild: message.guild.id
    }, async (err, data) => {
      if (!data) return message.reply({embed: { description: "Member was not muted!", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 50000 }));
      const user = data.Users.findIndex((prop) => prop === Member.id);

      if (user == -1) return message.reply({embed: { description: "Member is not muted!", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 50000 }));
      data.Users.splice(user, 1);
      await Member.roles.remove(role)
      message.channel.send({embed: { description: `${Member.displayName} is now unmuted`, color: 0xff7700 }}).then(msg => msg.delete({ timeout: 50000 }));
    }
    );
  },
};