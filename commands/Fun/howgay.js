const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "howgay",
    category: "🎮 | Fun",
    ownerOnly: false,
    usage: '[user]',
    description: 'See how gay you are',
    run : async(client, message, args) => {

        function randomInteger(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min +1)) + min
          }
            const target = message.mentions.users.first()
            const authorId = message.author.id
        
            let amount = randomInteger(1,100)
            let text = message.mentions.members.first()
            let embedd = new MessageEmbed()
            .setColor(0xff7700)
            .setTitle("Gay machine")
            .setDescription(`You are **${amount}%** gay`)
        
            if (target === authorId){
            
             message.channel.send(embedd)}
            if(!target)return message.channel.send(embedd) 
            let targett = target.username
             let embed = new MessageEmbed()
            .setColor(0xff7700)
            .setTitle("Gay machine")
            .setDescription(`${targett} is **${amount}%** gay`)
             message.channel.send(embed)
           

    }
}