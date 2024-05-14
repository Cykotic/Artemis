const { MessageEmbed } = require("discord.js")
const Schema = require("../../models/bio-schema");

module.exports = {
	name: "setbio",
	category: "⚙️ | utility",
	usage: "Nothing rlly",
	ownerOnly: false,
	description: "Nothing",
	run: async (client, message, args) => {

		if (args.join(" ")) return message.reply(
            new MessageEmbed()
            .setTitle(`❌ ERROR | An error occurred`)
            .setDescription(`${member.toString()} don't have a bio`)
            .setColor(0xff7700)
		).then(msg => msg.delete({ timeout: 10000 }));
		Schema.findOne({ User: message.author.id }, async (err, data) => {
			if (data) data.delete();
			new Schema({
				User: message.author.id,
				Bio: args.join(" ")
			}).save();
		})
		message.reply(
			new MessageEmbed()
            .setTitle(`Successfully Updated Your Bio`)
            .setColor(0xff7700)
		).then(msg => msg.delete({ timeout: 10000 }));
	}
}