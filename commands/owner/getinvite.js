const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'invite',
    aliases: ['gi'],
    category: "⛔ | Developer",
    description: 'Runs javascript as the discord bot client.',
    ownerOnly: true,
    run: async (client, message, args) => {

            const guild = client.guilds.cache.find(g => g.name === args.join(' ')) || client.guilds.cache.get(args[0]);
            if (!guild) {
                const embed = new MessageEmbed()
                    .setColor(0xff7700)
                    .setTitle('Please give me a valid server name');
                return message.channel.send(embed);
            }
            try {
                const tChannel = guild.channels.cache.find(ch => ch.type == 'text' && ch.permissionsFor(ch.guild.me).has('CREATE_INSTANT_INVITE'));
                if (!tChannel) {
                    const error = new MessageEmbed()
                        .setColor(0xff7700)
                        .setTitle('There aint any text channel i can create an invite in 😦 or some other err ocured :/');
                    return message.channel.send(error);
                }
                const invite = await tChannel.createInvite({ temporary: false, maxAge: 0 });
                message.channel.send(invite.url);
            }
            catch (err) {
                const error1 = new MessageEmbed()
                    .setColor('0xff7700')
                    .setTitle('There was an err doing that ```' + err + '\n```');
                return message.channel.send(error1);
        }
    }
}