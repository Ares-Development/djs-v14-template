const fs = require('node:fs');
const chalk = require('chalk');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const options = require('../options.json');

async function prefixCommands(client) {
    if(options.prefix) {
        const folders = await readdir('./src/prefix-commands/');
        folders.forEach((dir) => {
            const commands = fs.readdirSync(`./src/prefix-commands/${dir}/`).filter((file) => file.endsWith('.js'));
            for(const file of commands) {
                const data = require(`../prefix-commands/${dir}/${file}`);
                if(!data.name) return console.log(chalk.white(`[${chalk.red("PREFIX")}]${chalk.white(" - ")}Prefix command at ${chalk.grey(`${file}`)}} is missing a name`))
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
}

module.exports = prefixCommands;