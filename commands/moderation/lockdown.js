const { prefix } = require("../../config.json")

module.exports = {
    name: "lock",
    category: "🔨 | Moderation",
    description: "locks all channels down",
    aliases: ["ld"],
    memberpermissions: ['MANAGE_MESSAGES'],
    usage: `${prefix}lockdown [ON/OFF]`,
    example: `${prefix}lockdown [ON/OFF]`,
    run: async (client, message, args) => {
        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                }).then(() => {
                    channel.setName(channel.name += `🔒`)
                })
            })
            return message.channel.send({ embed: { description: "**Locking down all channels** ", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));
        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                }).then(() => {
                        channel.setName(channel.name.replace('🔒', ''))
                    }
                )
            })
            return message.channel.send({ embed: { description: "**unlocking down all channels** ", color: 0xff7700 }}).then(msg => msg.delete({ timeout: 5000 }));
        }
    }
}