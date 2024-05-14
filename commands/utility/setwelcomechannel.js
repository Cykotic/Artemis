const Schema = require('../../models/welcome-schema')
const { prefix } = require("../../config.json")

module.exports = {
    name: "setwelcomechannel",
    category: "⚙️ | utility",
    memberpermissions: ['MANAGE_CHANNELS'],
    description: "sets the welcome channel",
    usage: `${prefix}setwelcomechannel [channel]`,
    example: `${prefix}setwelcomechannel [welcome-channel]`,
    run: async (client, message, args) => {

        /* setting the welcome channel in the guild for the guild to log user who join and leave the guild. */
        const channel = message.mentions.channels.first();
        if (!channel) return message.reply("Please mention a channel");

        Schema.findOne({ Guild: message.guild.id}, async (err, data) => {
            if(data) {
                data.Channel = channel.id;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id,
                }).save();
            }
            message.reply(`${channel} has been set as the welcome channel`)
        })
    },
};