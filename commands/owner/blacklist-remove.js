const Blacklist = require('../../models/blacklist-schema');

module.exports = {
    name: "rblacklist",
    category: "⛔ | Developer",
    ownerOnly: true,
    aliases: ['rbl'],
    usage: "bl <mention / id>",
    description: "Nothing",
    run: async (client, message, args) => {

        const User = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!args[0]) return message.channel.send('Invalid Querey')
        if (!User) return message.channel.send("The member stated is no in the server")
        Blacklist.findOne({userID: User.user.id}, async (err, data) => {
            if(err) throw err
            if (data) {
                await Blacklist.findOneAndDelete({ userID: User.user.id })
                .catch(err => console.log(err))
                message.channel.send({ embed: { description: `**${User.displayName}** has been removed from blacklist.`, color: 0xff7700 }}).then(msg => msg.delete({timeout: 5000}))
            } else {
               message.channel.send({ embed: {  description: `**${User.displayName}** is not blacklisted.`, color: 0xff7700 }}).then(msg => msg.delete({timeout: 5000}))}
        });
    },
};