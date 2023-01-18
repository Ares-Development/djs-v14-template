const fs = require('node:fs');
const chalk = require('chalk');
const util = require('util');
const readdir = util.promisify(fs.readdir);

async function prefixCommands(client) {
    const folders = await readdir('./src/prefix-commands/');
    folders.forEach((dir) => {
        const commands = fs.readdirSync(`./src/prefix-commands/${dir}/`).filter((file) => file.endsWith('.js'));
        for(const file of commands) {
            const data = require(`../prefix-commands/${dir}/${file}`);
            client.prefixCommands.set(data.name, data)

            if(data.aliases) {
                data.aliases.forEach((alias) => {
                    client.aliases.set(alias, data.name)
                })
            }
            console.log(chalk.white(`[${chalk.grey("PREFIX")}]${chalk.white(" - ")}Loaded ${data.name}`));
        }
    })
    console.log(" ");
}

module.exports = prefixCommands;