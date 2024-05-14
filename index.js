const { token } = require("./config.json");
const { Client, Collection } = require('discord.js');
const { color } = require('colors')
const client = new Client({
  messageCacheLifetime: 60,
  fetchAllMembers: false,
  messageCacheMaxSize: 10,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});


// client.on('debug', console.log);

/** collection **/
client.commands = new Collection();
client.aliases = new Collection();
client.snipes = new Collection();
client.cooldowns = new Collection();

/** handlers **/
["command", "events", "distube-handler"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});


client.login(token);