const fetch = require('node-fetch');

module.exports = {
    name: "pussy",
    category: "🍆 | NSFW",
    description: 'Sends you but Pictures 🍑',
    cooldown: 3,
    run: async (client, message, args) => {
      try {
        var subreddits = [
            'pussy',
            'vagina',
            'PerfectPussies',
            'rearpussy',
            'GirlsInSocks',
            'girlsinanklesocks'
          ]

        var reddit = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
      
        const data = await fetch(`https://meme-api.herokuapp.com/gimme/${reddit}`).then(res => res.json())

        if (!data) return message.channel.send(`Sorry, seems like i can't connect to API.`);
      
        const { title, postLink, url, subreddit } = data

        message.channel.send({
          embed: {
            color: 0xff7700,
            title: `${title}`,
            url: `${postLink}`,
            image: {
              url: url
            },
            footer: { text: `/reddit/${subreddit}` }
          }
        });
      } catch(error) {
        this.client.emit("apiError", error, message);
      }
    }
};