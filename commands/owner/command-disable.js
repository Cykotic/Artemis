const schema = require("../../models/command-schema");

module.exports = {
    name: "command-disable",
    category: "⛔ | Developer",
    ownerOnly: true, 
    aliases: ['cmd-d'],
    usage: ".cmd-d <command>",
    description: "disables the desire command",
    run: async (client, message, args) => {

        const cmd = args[0];
        if(!cmd) return message.channel.send('Please specify a command!')
        if(!!client.commands.get(cmd) === false) return message.channel.send({ embed: { color: 0xff7700, description: 'This command does not exist' }});
        schema.findOne({ Guild: message.channel.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return message.channel.send({ embed: { color: 0xff7700, description: "This command has already been disabled." }})
                data.Cmds.push(cmd)
            } else {
                data = new schema({ Guild: message.guild.id, Cmds: cmd})}
            message.delete()
            await data.save();
            message.channel.send({embed: { color: 0xff7700, description: `Disabled: **${cmd}**`}}).then(msg => msg.delete({timeout: 5000}))})
    },
};