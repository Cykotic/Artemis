// const { MessageEmbed } = require("discord.js");
// const { geniusapi } = require("../../config.json")
// const { getLyrics } = require('genius-lyrics-api');


// module.exports = {
//     name: "lyrics",
//     category: "🎶 | Music",
//     aliases: ["ly"],
//     cooldown: 4,
//     useage: "lyrics ",
//     description: "Shows lyrics for this song",
//     run: async (client, message, args, cmduser, text, prefix) => {

//         const { channel } = message.member.voice; // { message: { member: { voice: { channel: { name: "Allgemein", members: [{user: {"username"}, {user: {"username"}] }}}}}
//         if (!channel)
//             return message.channel.send(new MessageEmbed()
//                 .setColor(0xff7700)
//                 .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
//                 .setTimestamp()
//                 .setTitle(`❌ ERROR | Please join a Channel first`)
//             );

//         let queue = client.distube.getQueue(message);
//         if (!queue) return message.channel.send(new MessageEmbed()
//             .setColor(0xff7700)
//             .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
//             .setTimestamp()
//             .setTitle(`❌ ERROR | There is nothing playing!`)
//         ).then(msg => msg.delete({ timeout: 5000 }).catch(console.error));

//         let cursong = queue.songs[0];
//         message.channel.send(new MessageEmbed()
//             .setColor(0xff7700)
//             .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
//             .setTimestamp()
//             .setTitle(`Searching!`)
//         ).then(msg => msg.delete({ timeout: 5000 }).catch(console.error));

//         const options = {
//             apiKey: `${geniusapi}`,
//             title: cursong.name,
//             artist: cursong.info.videoDetails.author.name,
//             optimizeQuery: true
//         };

//         getLyrics(options).then(async (lyrics) => {

//             if (!lyrics || lyrics === null || lyrics === "null") return message.reply("no lyrics found!")

//             let currentPage = 0;
//             const embeds = lyricsEmbed(message, lyrics, cursong);

//             const queueEmbed = await message.channel.send(
//                 `**Current Page - ${currentPage + 1}/${embeds.length}**`,
//                 embeds[currentPage]
//             );

//             try {
//                 await queueEmbed.react("⬅️");
//                 await queueEmbed.react("⏹");
//                 await queueEmbed.react("➡️");
//             } catch (error) {
//                 console.error(error);
//                 message.channel.send(error.message).catch(console.error);
//             }

//             const filter = (reaction, user) =>
//                 ["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) && message.author.id === user.id;
//             const collector = queueEmbed.createReactionCollector(filter, { time: 60000 });

//             collector.on("collect", async (reaction, user) => {
//                 try {
//                     if (reaction.emoji.name === "➡️") {
//                         if (currentPage < embeds.length - 1) {
//                             currentPage++;
//                             queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
//                         }
//                     } else if (reaction.emoji.name === "⬅️") {
//                         if (currentPage !== 0) {
//                             --currentPage;
//                             queueEmbed.edit(`**Current Page - ${currentPage + 1}/${embeds.length}**`, embeds[currentPage]);
//                         }
//                     } else {
//                         collector.stop();
//                         reaction.message.reactions.removeAll();
//                     }
//                     await reaction.users.remove(message.author.id);
//                 } catch (error) {
//                     console.error(error);
//                     return message.channel.send(error.message).catch(console.error);
//                 }
//             });

//         });


//         //this function is for lyrics embed
//         function lyricsEmbed(message, lyrics, song) {
//             try {
//                 let embeds = [];
//                 let k = 1000;

//                 for (let i = 0; i < lyrics.length; i += 1000) {
//                     const current = lyrics.slice(i, k);
//                     let j = i;
//                     k += 1000;
//                     const embed = new MessageEmbed()
//                         .setTitle("Lyrics - " + song.name)
//                         .setURL(song.url)
//                         .setThumbnail(song.thumbnail)
//                         .setColor(0xff7700)
//                         .setDescription(current)
//                     embeds.push(embed);
//                 }
//                 return embeds;
//             } catch (error) {
//                 console.error
//             }
//         }
//     }
// }