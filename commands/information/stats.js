const Discord = require('discord.js');
os = require('os')
const moment = require("moment");
require("moment-duration-format");


module.exports = {
    name: "stats",
    category: "🔍 | Information",
    aliases: ["info", "botinfo"],
    run: async (client, message, args) => {

        const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const core = os.cpus()[0];
        const members = message.guild.members.cache;
		const channels = message.guild.channels.cache;
		const emojis = message.guild.emojis.cache;
        const embed = new Discord.MessageEmbed()
            .setThumbnail(client.user.displayAvatarURL())
            .setColor(0xff7700)
            .addField("**Main:**", [
                `> ❯ Uptime: **${duration}**`,
                `> ❯ Total Users: **${client.users.cache.size}**`,
                `> ❯ Total Servers: **${client.guilds.cache.size}**`,
                `> ❯ Total Channels: **${client.channels.cache.size.toLocaleString()}**`,
                `> ❯ Total Bots: **${message.guild.members.cache.filter(member => member.user.bot).size}**`,
                `> ❯ Total Commands: **${client.commands.size}**`,
                `> ❯ Presence:`,
				`> \u3000 <a:online:833930380264210442> ❯ Online:** ${members.filter(member => member.presence.status === 'online').size}**`,
				`> \u3000 <a:idle:833930380297633863> ❯ Idle:** ${members.filter(member => member.presence.status === 'idle').size}**`,
				`> \u3000 <a:dnd:833930380208767007> ❯ Do Not Disturb:** ${members.filter(member => member.presence.status === 'dnd').size}**`,
                `> \u3000 <a:offline:833930379861557270> ❯ Offline:** ${members.filter(member => member.presence.status === 'offline').size}**`,
            ])
			.addField('Statistics', [
				`> ❯ Role Count: **${roles.length}**`,
				`> ❯ Emoji Count: **${emojis.size}** `,
				`> ❯ Regular Emoji Count: **${emojis.filter(emoji => !emoji.animated).size}**`,
				`> ❯ Animated Emoji Count: **${emojis.filter(emoji => emoji.animated).size}**`,
				`> ❯ Member Count: **${message.guild.memberCount}**`,
				`> ❯ Humans: **${members.filter(member => !member.user.bot).size}**`,
				`> ❯ Bots: **${members.filter(member => member.user.bot).size}**`,
				`> ❯ Text Channels: **${channels.filter(channel => channel.type === 'text').size}**`,
				`> ❯ Voice Channels: **${channels.filter(channel => channel.type === 'voice').size}**`,
				`> ❯ Boost Count: **${message.guild.premiumSubscriptionCount || '0'} **`,
                `> ❯ Boost Tier: **${message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : 'None'} **`,
				'\u200b'
			])
            .addField("**Spec:**", [
                `> ❯ System: **${os.platform()}**`,
                `> ❯ Platform: **${os.platform()}**`,
                `> ❯ Arch: **${os.arch()}**`,
                `> ❯ RAM: **${Math.trunc((process.memoryUsage().heapUsed) / 1024 / 1000)} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round((Math.round(process.memoryUsage().heapUsed / 1024 / 1024) / Math.round(os.totalmem() / 1024 / 1024)) * 100)}%)**`,
                `> ❯ RAM Usage: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB**`,
                `> ❯ CPU:`,
				`> \u3000 Cores: ${os.cpus().length}`,
				`> \u3000 Model: ${core.model}`,
				`> \u3000 Speed: ${core.speed}MHz`,
		
            ])
            .addField("**Version:**", [
                `> ❯ Discord.js Version: **${Discord.version}**`,
                `> ❯ Node Version: **${process.version}**`,
            ])

            .setTimestamp()
            .setFooter(message.author.tag, message.member.user.displayAvatarURL())
        message.channel.send(embed)
    }
}