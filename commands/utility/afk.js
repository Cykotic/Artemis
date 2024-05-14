const { MessageEmbed } = require('discord.js');
const afk = require('../../models/afk-schema');

module.exports = {
    name: 'afk',
    usage: ['<reason>'],
    description: 'Set an AFK message!',
    category: "⚙️ | utility",
    run: async (client, message, args) => {

        const oldNickname = message.member.nickname || message.author.username;
        const nickname = `[AFK] ${oldNickname}`;
        const userr = message.mentions.users.first();
        if (userr) return message.channel.send("Please make sure not to include mentions.")
        let everyoneping = (args.indexOf("@everyone") > -1);
        if (everyoneping === true) return message.channel.send("you may not use the everyone ping")
        if (args.length > 100) {
            message.channel.send(`${language.afk3}`)
        }
        const content = args.join(" ") || 'AFK';
        const afklist = await afk.findOne({ userID: message.author.id });

        await message.member.setNickname(nickname).catch(() => { })

        if (!afklist) {
            const newafk = new afk({
                userID: message.author.id,
                serverID: message.guild.id,
                reason: content,
                oldNickname: oldNickname,
                time: new Date()
            });
            const embed = new MessageEmbed()
                .setTitle("You have been set to afk")
                .setDescription(`**Reason:** "${content}"`)
                .setColor(0xff7700)
                .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true, size: 512 }))
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            message.channel.send(embed)
            newafk.save().catch((err) => console.error(err));
        }
    }
}