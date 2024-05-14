const Guild = require("../../models/log-schema");//require our log model
const mongoose = require("mongoose");
const { prefix } = require("../../config.json")

module.exports = {
  name: "setlogchannel",
  category: "⚙️ | utility",
  memberpermissions: ['MANAGE_GUILD'],
  description: "sets the log channel",
  usage: `${prefix}setlogchannel [channel]`,
  example: `${prefix}setlogchannel [log-channel]`,
  run: async (client, message, args) => {
    message.delete();


    const channel = message.mentions.channels.first();
    if(!channel) return message.channel.send(`Hey! you need to mention a channel!`)
    const guild1 = message.guild;
    let webhookid;
    let webhooktoken;
    await channel.createWebhook(guild1.name, {
      avatar: guild1.iconURL({ format: "png" }),
    })
      .then(webhook => {
        webhookid = webhook.id;
        webhooktoken = webhook.token;
      });
   
    if (!channel)
      return message.channel
        .send(
          "I cannot find that channel. Please mention a channel within this server."
        )// if the user do not mention a channel
        .then(m => m.delete({ timeout: 5000 }));
    
    await Guild.findOne(//will find data from database
      {
        guildID: message.guild.id
      },
      async (err, guild) => {
        if (err) console.error(err);
        if (!guild) {// what the bot should do if there is no data found for the server
          const newGuild = new Guild({
            _id: mongoose.Types.ObjectId(),
            guildID: message.guild.id,
            guildName: message.guild.name,
            logChannelID: channel.id,
            webhookid: webhookid,
            webhooktoken: webhooktoken
          });

          await newGuild
            .save() //save the data to database(mongodb)
            .then(result => console.log(result))
            .catch(err => console.error(err));

          return message.channel.send(
            `The log channel has been set to ${channel}`
          );
        } else {
          guild
            .updateOne({ //if data is found then update it with new one
              logChannelID: channel.id,
              webhooktoken: webhooktoken,
              webhookid: webhookid
            })
            .catch(err => console.error(err));

          return message.channel.send(
            `The log channel has been updated to ${channel}`
          );
        }
      }
    );
  }
};

// if you need help ask in the help channel dont dm me