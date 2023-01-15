const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Shows information about the bot.")
    .setDMPermission(false),
    async execute(interaction, client) {
        let total = (client.uptime / 1000);
        let days = Math.floor(total / 86400);
        total %= 86400;
        let hours = Math.floor(total / 3600);
        total %= 3600;
        let minutes = Math.floor(total / 60);
        let seconds = Math.floor(total % 60);

        const uptime = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`

        const embed = new EmbedBuilder()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setThumbnail(client.user.displayAvatarURL())
        .addFields(
            { name: "General", value: `👥 | User Count: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}\n🏠 | Guild Count: ${client.guilds.cache.size}\n📡 | Latency: ${Math.floor(client.ws.ping)}ms` },
            { name: "Uptime", value: `☑️ | ${uptime}` },
        )
        .setColor("Green")
        .setFooter({ text: "Ares Development", iconURL: client.user.displayAvatarURL() })

        return await interaction.reply({ embeds: [embed] })
    }
}