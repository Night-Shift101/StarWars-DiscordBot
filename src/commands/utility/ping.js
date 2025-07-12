const { SlashCommandBuilder } = require('discord.js');
const EmbedUtils = require('../../utils/embeds');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check bot latency and response time'),
    
    cooldown: 2, // 2 seconds cooldown
    
    async execute(interaction) {
        const sent = await interaction.reply({ 
            content: '🏓 Pinging...', 
            fetchReply: true 
        });
        
        const latency = sent.createdTimestamp - interaction.createdTimestamp;
        const apiLatency = Math.round(interaction.client.ws.ping);
        
        const embed = EmbedUtils.createEmbed({
            title: '🏓 Pong!',
            description: `📡 **Latency:** ${latency}ms\n💓 **API Latency:** ${apiLatency}ms`,
            color: latency < 100 ? 0x00FF00 : latency < 200 ? 0xFFFF00 : 0xFF0000,
            footer: 'Bot Performance Check'
        });
        
        await interaction.editReply({
            content: '',
            embeds: [embed]
        });
    },
};
