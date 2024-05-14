const Blacklist = require('../../models/blacklist-schema')

module.exports = {
    name: "blacklist",
    category: "⛔ | Developer",
    ownerOnly: true,
    aliases: ['bl'],
    usage: "bl <mention / id>",
    description: "Nothing",
    run: async (client, message, args) => {

        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send('Invalid Querey')
        if (!User) return message.channel.send("The member stated is no in the server")
        let profile = await Blacklist.findOne(
            {
                userID: User.user.id
            }
        );
        if (profile) return message.channel.send(
            {
                embed: {
                    description: `**${User.displayName}** has already been blacklisted!`,
                    color: 0xff7700
                }
            }
        ).then(msg => msg.delete({ timeout: 5000 }))
        profile = await new Blacklist({ userID: User.user.id });
        try {
            await profile.save();
            message.channel.send(
                {
                    embed: {
                        description: `**${User.displayName}** has been blacklist!`,
                        color: 0xff7700
                    }
                }
            ).then(msg => msg.delete({ timeout: 5000 }))
        } catch (err) {
            console.log(err);
        }
    },
};