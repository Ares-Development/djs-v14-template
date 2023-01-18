const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
require('dotenv').config();

const client = new Client({ intents: [Object.keys(GatewayIntentBits)] })

client.commands = new Collection();
client.prefixCommands = new Collection();
client.aliases = new Collection();

const handlers = fs.readdirSync('./src/handlers').filter(f => f.endsWith('.js'));

for(const handler of handlers) {
    require(`./handlers/${handler}`)(client)
}

client.login(process.env.token)