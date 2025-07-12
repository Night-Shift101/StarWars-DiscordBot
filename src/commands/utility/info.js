const { SlashCommandBuilder } = require('discord.js');
const EmbedUtils = require('../../utils/embeds');
const config = require('../../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Display bot information and statistics'),
    
    cooldown: 10, // 10 seconds cooldown
    
    async execute(interaction) {
        const { client } = interaction;
        const uptime = process.uptime();
        
        // Calculate uptime
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor(uptime / 3600) % 24;
        const minutes = Math.floor(uptime / 60) % 60;
        const seconds = Math.floor(uptime % 60);
        
        const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        
        const embed = EmbedUtils.createEmbed({
            title: '🤖 Bot Information',
            description: config.bot.description,
            color: config.colors.primary,
            fields: [
                { name: '📊 Statistics', value: `**Guilds:** ${client.guilds.cache.size}\n**Users:** ${client.users.cache.size}\n**Commands:** ${client.commands.size}`, inline: true },
                { name: '⏱️ Uptime', value: uptimeString, inline: true },
                { name: '🔧 Version', value: config.bot.version, inline: true },
                { name: '📡 Ping', value: `${Math.round(client.ws.ping)}ms`, inline: true },
                { name: '💾 Memory Usage', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, inline: true },
                { name: '⚡ Node.js', value: process.version, inline: true }
            ],
            footer: 'May the Force be with you!',
            thumbnail: client.user.displayAvatarURL()
        });
        
        await interaction.reply({ embeds: [embed] });
    },
};
