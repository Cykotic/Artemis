const mongoose = require("mongoose")
const { mongo } = require('../../config.json')
const { prefix } = require('../../config.json')

module.exports = client => {

      const watchingStatus = [
        `${prefix}help | ${client.users.cache.size} users`,
        `${prefix}help | ${client.channels.cache.size} channels`, 
      ];

      /* client status */
      setInterval(() => {
        const index = Math.floor(Math.random() * (watchingStatus.length - 1) + 1);
        client.user.setActivity(watchingStatus[index], { type: 'WATCHING' }); //  WATCHING STREAMING LISTENING
      }, 3000); //THE NUMBER OF SECONDS IT CHANGES THE BOT STATUS, EXAMPLE : 2000 = 2 SEC

  /* connection to mongo db made in a db */
  console.log(`Connected to: [ ${client.user.tag} ]`)
  client.user.setStatus('idle')
  mongoose.connect(`${mongo}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(console.log("Mongoose has successfully connected!"))

}