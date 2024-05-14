const { MessageEmbed } = require('discord.js');
const got = require('got');

module.exports = {
    name: "meme",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",
    aliases: ["Nothing"],
    cooldown: 10,
    run: async (client, message, args) => {

  const embed = new MessageEmbed();
  got('https://www.reddit.com/r/dankmemes/random/.json').then(response => {
    let content = JSON.parse(response.body);
    let permalink = content[0].data.children[0].data.permalink;
    let memeUrl = `https://reddit.com${permalink}`;
    let memeImage = content[0].data.children[0].data.url;
    let memeTitle = content[0].data.children[0].data.title;
    let memeUpvotes = content[0].data.children[0].data.ups;
    // let memeDownvotes = content[0].data.children[0].data.downs;
    let memeNumComments = content[0].data.children[0].data.num_comments;
    embed.setTitle(`${memeTitle}`)
    embed.setURL(`${memeUrl}`)
    embed.setImage(memeImage)
    embed.setColor(0xff7700)
    embed.setFooter(`👍 ${memeUpvotes} 💬 ${memeNumComments}`)
    message.channel.send(embed);
  }).catch(console.error);
  }
};