const { REST, Routes } = require('discord.js');
const chalk = require('chalk');
const fs = require('node:fs');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const options = require('../options.json');

async function slashLoader() {
    const slashCommands = [];
    const slashFolders = await readdir('./src/commands/');
    slashFolders.forEach((dir) => {
        const commands = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for(const file of commands) {
            const command = require(`../commands/${dir}/${file}`);
            try {
                slashCommands.push(command.data.toJSON())
            } catch(e) {
                console.log(chalk.white(`[${chalk.red("ERROR")}]${chalk.white(" - ")}${e.stack}`));
            }
        }
    })

    const rest = new REST({ version: '10' }).setToken(process.env.token)

    try {
        console.log(chalk.white(`[${chalk.grey("SLASH")}]${chalk.white(" - ")}Started refreshing ${slashCommands.length} application commands`));

        if(options.slash_global == true) {
            const global_data = await rest.put(Routes.applicationCommands(process.env.clientId), { body: slashCommands });
            console.log(chalk.white(`[${chalk.grey("SLASH")}]${chalk.white(" - ")}Successfully reloaded ${global_data.length} application commands`));
            console.log(" ");
        } else {
            const guild_data = await rest.put(Routes.applicationGuildCommands(process.env.clientId, process.env.guildId), { body: slashCommands });
            console.log(chalk.white(`[${chalk.grey("SLASH")}]${chalk.white(" - ")}Successfully reloaded ${guild_data.length} guild application commands`));
            console.log(" ");
        }
    } catch(e) {
        console.log(chalk.white(`[${chalk.red("SLASH")}]${chalk.white(" - ")}There was an error while refreshing the application commands: ${e.stack}`));
        console.log(" ");
    }
}

module.exports = slashLoader;