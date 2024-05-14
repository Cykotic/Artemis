const { MessageEmbed } = require('discord.js');
const Schema = require('../../models/bio-schema');

module.exports = {
    name: "bio",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",
    cooldown: 10,
    run : async(client, message, args) => {
		let member = message.mentions.members.first();
		if (!member) {
			member = message.member;
		}
		let data = await Schema.findOne({ User: member.id });
		if (!data) {
			return message.channel.send(
                new MessageEmbed()
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`${member.toString()} don't have a bio`)
                .setColor(0xff7700)
            ).then(msg => msg.delete({ timeout: 10000 }));
		}
		message.channel.send(
			new MessageEmbed()
				.setTitle(`${member.user.tag}'s Bio`)
				.setDescription(data.Bio)
				.setColor(0xff7700)
                .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                .setTimestamp()
				.setThumbnail(member.user.displayAvatarURL({ dynamicdy: true }))
		);
	}
};
