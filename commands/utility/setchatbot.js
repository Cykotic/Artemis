const Schema = require("../../models/chatbot-schema");
const { prefix } = require("../../config.json")

module.exports = {
    name: "setchatbot",
    category: "⚙️ | utility",
    memberpermissions: ['MANAGE_MESSAGES'],
    description: "sets the chatbot and talk to the ai",
    usage: `${prefix}setchatbot [channel]`,
    example: `${prefix}setchatbot [channel-test]`,
    run: async (client, message, args) => {

        /* chatbot set the channel of where you desire to chat with the bot */
        const channelx = message.mentions.channels.first();
        if (!channelx) return message.reply("Please mention a channel");

        const channel = message.mentions.channels.first() || message.channel;
        Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
            if (data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id,
                }).save();
                message.channel.send(`Saved chatbot channel to ${channel}`);
            });
        },
    };