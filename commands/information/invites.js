const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "invitelist",
    aliases: "li",
    category: "🔍 | Information",
    description: "Top 10 inviter in ther server",
    run: async(client, message) => {
       

    message.guild.fetchInvites().then((invites) => {
        const inviteCounter = {}

        invites.forEach((invite => {
            const { uses, inviter } = invite
            const { username, discriminator } = inviter

            const name = `${inviter}`

            inviteCounter[name] = (inviteCounter[name] || 0) + uses
        }))

        let replyText = new MessageEmbed()
            .setTitle(`📩 Invitation Cards ${message.guild.name}`)
            .setDescription(` \n`)
            .setColor(0xff7700)
        const sortedInvites = Object.keys(inviteCounter).sort((a, b) => inviteCounter[b] - inviteCounter[a])

        if (sortedInvites.length > 10) sortedInvites.length = 10
        else if (sortedInvites.length > 10) sortedInvites.length = sortedInvites.length


        for (const invite of sortedInvites) {
            const count = inviteCounter[invite]
            replyText.description += `\n${invite} has invited ${count} member(s).`
        }
        message.reply(replyText)
    })
    }
}