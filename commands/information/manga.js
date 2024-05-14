const { MessageEmbed } = require('discord.js');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = {
    name: "manga",
    category: "🔍 | Information",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",
    run: async (client, message, args) => {

    try {

      let search = args.join(" ");

      if(!search) return message.reply({
        embed: {
            color: 0xff7700,
            description: `Please give something to search!`
        }
    })


      kitsu.searchManga(search).then(result => {
        if (result.length === 0) {
          return message.channel.send(`No search results found for **${search}**!`);
        }

        let manga = result[0]

        let embed = new MessageEmbed()
          .setColor("0xff7700")
          .setAuthor(`${manga.titles.english}`, manga.posterImage.original)
          .setDescription(manga.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
          .addField('❯\u2000\Information', `•\u2000\**Japanese Name:** ${manga.titles.romaji}\n\•\u2000\**Age Rating:** ${manga.ageRating ? manga.ageRating : '`N/A`'}\n\•\u2000\**Chapters:** ${manga.chapterCount ? manga.chapterCount : '`N/A`'}`, true)
          .addField('❯\u2000\Stats', `•\u2000\**Average Rating:** ${manga.averageRating ? manga.averageRating : '`N/A`'}\n\•\u2000\**Rating Rank:** ${manga.ratingRank ? manga.ratingRank : '`N/A`'}\n\•\u2000\**Popularity Rank:** ${manga.popularityRank ? manga.popularityRank : '`N/A`'}`, true)
          .addField('❯\u2000\Status', `•\u2000\**Volumes:** ${manga.volumeCount ? manga.volumeCount : '`N/A`'}\n\•\u2000\**Start Date:** ${manga.startDate}\n\•\u2000\**End Date:** ${manga.endDate ? manga.endDate : "Ongoing"}`, true)
          .setFooter(message.author.tag, message.member.user.displayAvatarURL())
          .setTimestamp()
          .setImage(manga.posterImage.original);
        return message.channel.send({ embed });
      })
    } catch (err) {
      return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
    }
	}
}