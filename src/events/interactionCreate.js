const { Events } = require('discord.js');
const chalk = require('chalk');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if(!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName)
    
        if(!command) {
            console.log(chalk.white(`[${chalk.grey("SLASH")}]${chalk.white(" - ")}${chalk.red(`No command matching ${interaction.commandName} was found`)} `))
            return;
        }
    
        try {
            await command.execute(interaction, client)
        } catch(e) {
            console.log(chalk.white(`[${chalk.red("SLASH")}]${chalk.white(" - ")}There was an error while executing an application command: ${e.stack}`))
            try {
                await interaction.reply({ content: "There was an error while executing this command, please try again", ephemeral: true });
            } catch {
                return;
            }
        }
    }
}