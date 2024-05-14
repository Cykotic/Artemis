const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const config = require("../../config.json")

module.exports = {
    name: "poker",
    aliases: ["poke"],
    category: "🎮 | Minigames",
    usage: "Nothing rlly",
    description: "gives a link to where you can play with you're friends",
    run: async (client, message, args) => {

        const { channel } = message.member.voice;
        if(!channel) return message.reply(new MessageEmbed()
        .setColor(0xff7700)
        .setTimestamp()
        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        .setTitle("❌ Error | You need to join a Voice Channel")
        ).then(msg => msg.delete({ timeout: 10000 }));

        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: "755600276941176913",
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${config.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
        .then(invite =>{
            if(!invite.code) return message.reply(new MessageEmbed()
            .setColor(0xff7700)
            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            .setTitle("❌ Error | Cannot start minigame" )
            ).then(msg => msg.delete({ timeout: 10000 }));
            message.channel.send(`Click on the Link to start the GAME:\n> https://discord.com/invite/${invite.code}`)
            // message.channel.send(new MessageEmbed()
            // .setColor(0xff7700)
            // .setTimestamp()
            // .setFooter(message.author.tag, message.member.user.displayAvatarURL())
            // .setTitle(`Click on the Link to start \`Poker\`:\n> https://discord.com/invite/${invite.code}`)
            // )
        })
    }
};