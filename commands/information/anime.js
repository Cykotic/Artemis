const { MessageEmbed } = require('discord.js');
let aq = require('animequote');
const Kitsu = require('kitsu.js');
const kitsu = new Kitsu();

module.exports = {
    name: "anime",
    category: "🔍 | Information",
    ownerOnly: false,
    usage: "Nothing",
    description: "Nothing",
    run: async (client, message, args) => {

        try {
            let search = args.join(" ");

            if (!search) {

                kitsu.searchAnime(aq().quoteanime).then(result => {

                    let anime = result[0]

                    let embed = new MessageEmbed()
                        .setColor("0xff7700")
                        .setAuthor(`${anime.titles.english} | ${anime.showType}`, anime.posterImage.original)
                        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                        .addField('❯\u2000\Information:', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                        .addField('❯\u2000\Stats:', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                        .addField('❯\u2000\Status:', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
                        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                        .setTimestamp()
                        .setImage(anime.posterImage.original);
                    return message.channel.send(`📺 | Try watching **${anime.titles.english}**!`, { embed });
                })

            } else {
                let search = args.join(" ");

                kitsu.searchAnime(search).then(result => {
                    if (result.length === 0) {
                        return message.channel.send(`No search results found for **${search}**!`);
                    }

                    let anime = result[0]

                    let embed = new MessageEmbed()
                        .setColor("0xff7700")
                        .setAuthor(`${anime.titles.english ? anime.titles.english : search} | ${anime.showType}`, anime.posterImage.original)
                        .setDescription(anime.synopsis.replace(/<[^>]*>/g, '').split('\n')[0])
                        .addField('❯\u2000\Information:', `•\u2000\**Japanese Name:** ${anime.titles.romaji}\n\•\u2000\**Age Rating:** ${anime.ageRating}\n\•\u2000\**NSFW:** ${anime.nsfw ? 'Yes' : 'No'}`, true)
                        .addField('❯\u2000\Stats:', `•\u2000\**Average Rating:** ${anime.averageRating}\n\•\u2000\**Rating Rank:** ${anime.ratingRank}\n\•\u2000\**Popularity Rank:** ${anime.popularityRank}`, true)
                        .addField('❯\u2000\Status:', `•\u2000\**Episodes:** ${anime.episodeCount ? anime.episodeCount : 'N/A'}\n\•\u2000\**Start Date:** ${anime.startDate}\n\•\u2000\**End Date:** ${anime.endDate ? anime.endDate : "Still airing"}`, true)
                        .setTimestamp()
                        .setFooter(message.author.tag, message.member.user.displayAvatarURL())
                        .setImage(anime.posterImage.original);
                    return message.channel.send({ embed });
                });
            }
        } catch (err) {
            return message.reply(`Oh no, an error occurred: \`${err.message}\`.`);
        }
    }
}