const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, Embed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("nuke")
    .setDescription("Nukes the channel it is used in.")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),
    async execute(interaction) {
        let channel = interaction.channel;
        let position = channel.position;

        try {
            await channel.clone()
            .then(async(msg) => {
                await channel.delete()
                interaction.guild.channels.setPositions([{ channel: msg, position: position + 1 }])
                
                await msg.send({ embeds: [new EmbedBuilder().setDescription(`Channel nuked by \`${interaction.user.tag}\``).setColor("Green")] })
            })
        } catch(e) {
            return await interaction.reply({ embeds: [new EmbedBuilder().setDescription(`There was an error while nuking this channel.`).setColor("Red")], ephemeral: true })
        }
    }
}