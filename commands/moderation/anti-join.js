const { antijoin } = require("../../utility/collection");
const { prefix } = require("../../config.json")

module.exports = {
    name: "anti-join",
    category: "🔨 | Moderation",
    description: "mostly for anti-raid, it kicks out the people who are trting to join when this is active",
    aliases: ["aj", "antij"],
    usage: `${prefix}antijoin [ON/OFF/LIST]`,
    example: `${prefix}antijoin [ON/OFF/LIST]`,
    memberpermissions: ['KICK_MEMBERS'],
    run: async (client, message, args) => {

        const query = args[0]?.toLowerCase();
        if (!query) return message.reply(
            {
                embed: {
                    description: "Please specify a query!",
                    color: 0xff7700,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

        const getCollection = antijoin.get(message.guild.id);
        if (query === 'on') {
            if (getCollection)
                return message.reply(
                    {
                        embed: {
                            description: "Antijoin is already \`ENABLED!\`"

                        }
                    }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

            antijoin.set(message.guild.id, []);
            message.reply({
                embed: {
                    description: "Anti-Join: \`ENABLED\`",
                    color: 0xff7700,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        } else if (query === 'off') {
            if (!getCollection)
                return message.reply(
                    {
                        embed: {
                            description: "Antijoin is already \`DISABLED!\`",
                            color: 0xff7700,
                        }
                    }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))

            antijoin.delete(message.guild.id);
            message.reply({
                embed: {
                    description: "Anti-Join \`DISABLED\`",
                    color: 0xff7700,
                }
            }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
        } else if (query === "list") {
            if (!getCollection) return message.reply(
                {
                    embed: {
                        description: "Antijoin is \`DISABLED!\`",
                        color: 0xff7700,
                    }
                }).then(msg => msg.delete({ timeout: 10000 }).catch(e => console.log(e.message)))
            message.reply({
                embed: {
                    color: 0xff7700,
                    description: (
                        `Kicked Members: ${getCollection.map((value) => {
                            return `\`${value.tag}\``;
                        })}`
                    )
                }
            })
        }
    }
}