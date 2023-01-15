const fs = require('node:fs');
const chalk = require('chalk');
const util = require('util');
const readdir = util.promisify(fs.readdir);

async function slashCommands(client) {
    const slashFolders = await readdir('./src/commands/');
    slashFolders.forEach((dir) => {
        const commands = fs.readdirSync(`./src/commands/${dir}/`).filter((file) => file.endsWith('js'));
        for(const file of commands) {
            const command = require(`../commands/${dir}/${file}`);
            if('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command)
            } else {    
                console.log(chalk.white(`[${chalk.red("SLASH")}]${chalk.white(" - ")}Application command at ${chalk.grey(`${file}`)} is missing the data or execute property`))
            }
        }
    })
}

module.exports = slashCommands