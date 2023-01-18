const { EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: "nuke",
    run: async(client, message, args) => {
        if(!message.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
            return await message.reply({ embeds: [new EmbedBuilder().setDescription(`You don't have permission to use this command.`).setColor("Red")] })
        }

        let channel = message.channel;
        let position = channel.position;

        try {
            await channel.clone()
            .then(async(msg) => {
                await channel.delete()
                message.guild.channels.setPositions([{ channel: msg, position: position + 1 }])
                
                await msg.send({ embeds: [new EmbedBuilder().setDescription(`Channel nuked by \`${message.author.tag}\``).setColor("Green")] })
            })
        } catch {
            return;
        }
    }
}