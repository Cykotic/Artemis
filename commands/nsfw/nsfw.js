const fetch = require('node-fetch');

module.exports = {
    name: "nsfw",
    category: "🍆 | NSFW",
    nsfwOnly: true,
    description: 'Sends you but Pictures 🍑',
    cooldown: 3,
    run: async (client, message, args) => {
      try {
        var subreddits = [
            'asstastic',
            'pawg',
            'facedownassup',
            'ass',
            'brunetteass',
            'CheekyBottoms',
            'datgap',
            'underbun',
            'pawgtastic',
            'BestBooties',
            'CuteLittleButts',
            'bikinis',
            'bikinibodies',
            'boobs',
            'Boobies',
            'Stacked',
            'BustyPetite',
            'Cleavage',
            'bustyasians',
            'boltedontits',
            'burstingout',
            'CelebrityFeet',
            'FFSocks',
            'Feet_NSFW',
            'FootFetish',
            'FFNBPS',
            'feetish',
            'scent_of_women_feet',
            'AsianFeet',
            'gayfootfetish',
            'HighHeels',
            'Soles',
            'CosplayFeet',
            'dirtyfeet',
            'DesiFeet',
            'ebonyfeet',
            'rule34feet',
            'girlsinanklesocks',
            'Porn_Star_Feet',
            'FeetVideos',
            'Soles_And_Holes',
            'Footjobs',
            'pussy',
            'vagina',
            'PerfectPussies',
            'rearpussy',
            'nnlegalteens',
            'Barelylegal',
            'barelylegalteens',
            'LegalTeens',
            'thighs',
            'PerfectThighs',
            'thickthighs',
            'girlsinyogapants',
            'YogaPants',
  
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