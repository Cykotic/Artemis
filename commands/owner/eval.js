const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'eval',
    aliases: ['e'],
    category: "⛔ | Developer",
    description: 'Runs javascript as the discord bot client.',
    ownerOnly: true,
    run: async (client, message, args) => {
        
        const input = args.join(' ');
        if (!input) return message.channel.send(`What do I evaluate?`)
        if(!input.toLowerCase().includes('token')) {
    
        let embed =  ``;
    
          try {
            let output = eval(input);
            if (typeof output !== 'string') output = require('util').inspect(output, { depth: 0 });
            
             embed = `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``
    
          } catch(err) {
            embed = `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``
          }
    
          message.channel.send(embed);
    
        } else {
          message.channel.send('Bruh you tryina steal my token huh?');
        }
    }
};