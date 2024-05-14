const axios = require("axios");

module.exports = {
  name: "docs",
  category: "🔍 | Information",
  usage: "Nothing rlly",
  ownerOnly: false,
  description: "Nothing",

  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("Please specify a query!");
    const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      query
    )}`;

    await message.delete()
    axios.get(url).then(({ data }) => {
      if (data) {
        message.channel.send({ embed: data });
      }
    });
  },
};