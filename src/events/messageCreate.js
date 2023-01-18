const { Events } = require('discord.js');
const options = require('../options.json');

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if(options.prefix) {
            if(!message.guild || message.author.bot || !message.content.startsWith(process.env.prefix)) return;

            let args = message.content.slice(process.env.prefix.length).trim().split(/ +/g);
            let cmd = args.shift().toLowerCase();
            if(cmd.length == 0) return;
            let command = client.prefixCommands.get(cmd);
            if(!command) command = client.prefixCommands.get(client.aliases.get(cmd));
    
            if(command) {
                try {
                    await command.run(client, message, args)
                } catch {
                    return;
                }
            }
        }
    }
}