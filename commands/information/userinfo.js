const { MessageEmbed } = require('discord.js');
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
	name: "userinfo",
	aliases: ["ui",],
	category: "🔍 | Information",
	usage: "Nothing rlly",
	description: "Nothing",
	timeout: 1000,

	run: async (client, message, args) => {

		const member = message.mentions.members.last() || message.member;
		const account_age = `${((Date.now() - member.user.createdAt) / 1000 / 60 / 60 / 24 + '.0').toString().split('.')[0]} days`
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(e0, -1);
		let isBot = false
		if (member.user.bot) isBot = true
		const userFlags = member.user.flags.toArray()


		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setColor(0xff7700)
			.setTimestamp()
			.setFooter(message.author.tag, message.member.user.displayAvatarURL())
			.addField('Userinfo:', [
				`> **❯ Username:** ${member.user.username}`,
				`> **❯ Discriminator:** #${member.user.discriminator}`,
				`> **❯ ID:** ${member.id}`,
				// `> **❯ Nitro:** ${hasNitro}`,
				`> **❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
				`> **❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
				`> **❯ Time Created:**
				> \u3000 ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()} 
				> \u3000 (${account_age})`,
				//`> **❯ Status:** ${status}${STATUSES[member.user.presence.status]}`,
				`> **❯ Game:** ${member.user.presence.game || 'Not playing a game.'}`,
				`> **❯ Bot?:** ${isBot}`,
				`\u200b`
			])
			.addField('Member status:', [
				`> **❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
				`> **❯ Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
				`> **❯ Highest Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
				`> **❯ Role Color:** ${(member.displayHexColor)}`,
				`> **❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
				`\u200b`
			])

		return message.channel.send(embed);
	}
}