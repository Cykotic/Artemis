
const Distube = require("distube");
const { MessageEmbed } = require("discord.js");
const { format, delay } = require("../handlers/functions")

module.exports = (client) => {

  client.distube = new Distube(client, {
    searchSongs: false,
    emitNewSongOnly: false,
    highWaterMark: 1024 * 1024 * 64,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    leaveOnStop: true,

    // youtubeCookie --> prevents ERRORCODE: "429"
    youtubeDL: true,
    updateYouTubeDL: true,
    customFilters: {
      "clear": "dynaudnorm=f=200",
      "lowbass": "bass=g=6,dynaudnorm=f=200",
      "bassboost": "bass=g=20,dynaudnorm=f=200",
      "purebass": "bass=g=20,dynaudnorm=f=200,asubboost,apulsator=hz=0.08",
      "8D": "apulsator=hz=0.08",
      "vaporwave": "aresample=48000,asetrate=48000*0.8",
      "nightcore": "aresample=48000,asetrate=48000*1.25",
      "phaser": "aphaser=in_gain=0.4",
      "tremolo": "tremolo",
      "vibrato": "vibrato=f=6.5",
      "reverse": "areverse",
      "treble": "treble=g=5",
      "normalizer": "dynaudnorm=f=200",
      "surrounding": "surround",
      "pulsator": "apulsator=hz=1",
      "subboost": "asubboost",
      "karaoke": "stereotools=mlev=0.03",
      "flanger": "flanger",
      "gate": "agate",
      "haas": "haas",
      "mcompand": "mcompand"
    }
  })

  // Queue status template
  const status = (queue) => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filter || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

  // DisTube event listeners, more in the documentation page
  client.distube
    .on("playSong", (message, queue, song) => message.channel.send(new MessageEmbed()
      .setTitle("Playing :notes: " + song.name)
      .setURL(song.url)
      .setColor(0xff7700)
      .addField("Duration", `\`${song.formattedDuration}\``)
      .addField("QueueStatus", status(queue))
      .setThumbnail(song.thumbnail)
      .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true }))
    ).then(async msg => {
      let emojiarray = ["⏭", "⏹", "⏯", "◀️", "▶️", "🔉", "🔊"];
      for (const emoji of emojiarray)
        await msg.react(emoji)

      var filter = (reaction, user) => emojiarray.includes(reaction.emoji.name) && user.id !== message.client.user.id;

      var collector = await msg.createReactionCollector(filter, { time: song.duration > 0 ? song.duration * 1000 : 180000 });
      collector.on("collect", async (reaction, user) => {
        if (!queue) return;
        const member = reaction.message.guild.member(user)
        reaction.users.remove(user);
        if (!member.voice.channel)
          return message.channel.send(new MessageEmbed()
            .setColor(0xff7700)
            .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
            .setTimestamp()
            .setTitle(`❌ ERROR | Please join a voice channel`)
          ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
        switch (reaction.emoji.name) {
          case "⏭": // skip
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`⏭ Skipped the Track`)
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
            client.distube.skip(reaction.message)
            break;

          case "⏹": //stop
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`⏹ Stopped playing and left the channel`)
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
            client.distube.skip(reaction.message)
            break;

          case "⏯": // pause & resume
            if (client.distube.isPaused(message)) {
              client.distube.resume(message);
              await delay(100);
              client.distube.pause(message)
              await delay(100);
              client.distube.resume(message);
              return message.channel.send(new MessageEmbed()
                .setColor(0xff7700)
                .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
                .setTimestamp()
                .setTitle("▶ Resumed the Song")
              ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
            }
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle()
              .setTitle("⏸ Paused the Song")
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
            client.distube.pause(message);
            break;
          case "◀️": // backwards
            let seektime = queue.currentTime - 15 * 1000;
            if (seektime < 0)
              seektime = 0;
            if (seektime >= queue.songs[0].duration * 1000 - queue.currentTime)
              seektime = 0;

            client.distbe.seek(message, seektime);
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`◀️ Rewinded for \`15 Seconds\` to: ${format(seektime)}`)
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))

            break;
          case "▶️": // seek forward

            let seektime2 = queue.currentTime + 15 * 1000;
            if (seektime2 < 0)
              seektime2 = queue.songs[0].duration * 1000;
            if (seektime2 >= queue.songs[0].duration * 1000)
              seektime2 = queue.songs[0].duration * 1000 - 1000;
            client.distube.seek(message, seektime2);

            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`▶️ Forwarded for \`15 Seconds\` to: ${format(seektime2)}`)
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))

            break;
          case "🔉": // lower volume
            client.distube.setVolume(message, queue.volume - 10);
            if (queue.volume < 10) client.distube.setVolume(message, 0);
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`🔉 Reduced the Volume for \`10\` to: \`${queue.volume}%\``)
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))

            break;
          case "🔊": // rise volume
            client.distube.setVolume(message, Number(queue.volume) + 10);
            if (queue.volume > 150) client.distube.setVolume(message, 150);
            message.channel.send(new MessageEmbed()
              .setColor(0xff7700)
              .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
              .setTimestamp()
              .setTitle(`🔊 Raised the Volume for \`10\` to: \`${queue.volume}%\``)
            ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
            break;
        }
      })
      collector.on("end", () => {
        try {
          msg.delete()
        } catch {
        }
      })
    })
    )
    .on("addSong", (message, queue, song) => message.channel.send(new MessageEmbed()
      .setTitle("Added :thumbsup: " + song.name)
      .setURL(song.url)
      .setColor(0xff7700)
      .addField('Information:', [
        "💡 Requested by:", `${song.user}`,
        "⏱ Duration:", `\`${queue.formattedCurrentTime} / ${song.formattedDuration}\``,
        "🌀 Queue:", `\`${queue.songs.length} song(s) - ${queue.formattedDuration}\``,
        "🔊 Volume:", `\`${queue.volume} %\``,
        "♾ Loop:", `\`${queue.repeatMode ? queue.repeatMode === 2 ? "✅ Queue" : "✅ Song" : "❌"}\``,
        "↪️ Autoplay:", `\`${queue.autoplay ? "✅" : "❌"}\``,
        "❔ Filter:", `\`${queue.filter || "❌"}\``,
      ])
      .setFooter(message.author.tag, message.member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setThumbnail(song.thumbnail)
    ).then(msg => msg.delete({ timeout: 4000 }).catch(e => console.log(e.message)))
    )
    .on("playList", (message, queue, playlist, song) => message.channel.send(new MessageEmbed()
      .setTitle("Playing Playlist :notes: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
      .setURL(playlist.url)
      .setColor(0xff7700)
      .addField("Current Track: ", `[${song.name}](${song.url})`)
      .addField("Duration", `\`${playlist.formattedDuration}\``)
      .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration * 1000)}\``)
      .setThumbnail(playlist.thumbnail.url)
      .setFooter(`Requested by: ${song.user.tag}`, song.user.displayAvatarURL({ dynamic: true }))
    )
    )
    .on("addList", (message, queue, playlist) => message.channel.send(new MessageEmbed()
      .setTitle("Added Playlist :thumbsup: " + playlist.name + ` - \`[${playlist.songs.length} songs]\``)
      .setURL(playlist.url)
      .setColor(0xff7700)
      .addField("Duration", `\`${playlist.formattedDuration}\``)
      .addField(`${queue.songs.length} Songs in the Queue`, `Duration: \`${format(queue.duration * 1000)}\``)
      .setThumbnail(playlist.thumbnail.url)
      .setFooter(`Requested by: ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    )
    )
    .on("searchResult", (message, result) =>
      message.channel.send(new MessageEmbed()
        .setTitle("**Choose an option from below**")
        .setURL(song.url)
        .setColor(0xff7700)
        .setDescription(`${result.map((song, i) => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n\n*Enter anything else or wait 60 seconds to cancel*`)
        .setFooter(ee.footertext, ee.footericon)
      )
    )
    .on("searchCancel", (message) => message.channel.send(new MessageEmbed()
      .setColor(0xff7700)
      .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
      .setTimestamp()
      .setTitle(`❌ ERROR | Search Cancelled`)
    )
    )
    .on("error", (message, e) => {
      console.log(String(e.stack).bgRed)
      message.channel.send(new MessageEmbed()
        .setColor(0xff7700)
        .setFooter(`${message.author.tag}`, `${message.author.displayAvatarURL()}`)
        .setTimestamp()
        .setTitle(`❌ ERROR | An error occurred`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
      )
    })
    .on("initQueue", queue => {
      queue.autoplay = false;
      queue.volume = 75;
      queue.filter = "lowbass";
    }
    )
}