
const {readdirSync} = require('fs')

module.exports = {
    name: "reload",
    aliases: ["rr"],
    category: "⛔ | Developer",
    usage: "reload <command | folder>",
    ownerOnly: true, 
    description: 'reloads the commands | folder',
    run: async (client, message, args) => {
        
  
        let cmdfolder = args[0];
        if(!cmdfolder) return message.channel.send('❌ | Provide a command Folder!')
        let command = args[1];
        if (!command) return message.channel.send('❌ | Provide a command!')
        try{
               require(`../${cmdfolder}/${command}`) 
        } catch(e) {
            return message.channel.send('❌ | No command with that name found.') 
        }
        delete require.cache[require.resolve(`../${cmdfolder}/${command}`)];
        let pull = require(`../${cmdfolder}/${command}`);
        client.commands.set(pull.name, pull);
        //console.log(`Reloaded the command!`)
        return message.channel.send('✅ Done ')
    }
}