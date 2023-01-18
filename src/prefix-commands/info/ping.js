const { EmbedBuilder, Embed } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["p"],
    run: async(client, message, args) => {
        return await message.reply({ embeds: [new EmbedBuilder().setDescription(`${Math.floor(client.ws.ping)}ms`).setColor("Blue").setTimestamp()] })
    }
}