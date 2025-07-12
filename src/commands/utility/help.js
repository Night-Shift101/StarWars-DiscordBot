const { SlashCommandBuilder } = require('discord.js');
const EmbedUtils = require('../../utils/embeds');
const config = require('../../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Display bot commands and information')
        .addStringOption(option =>
            option.setName('command')
                .setDescription('Get detailed help for a specific command')
                .setRequired(false)
        ),
    
    cooldown: 5,
    
    async execute(interaction) {
        const commandName = interaction.options.getString('command');
        
        // If specific command is requested
        if (commandName) {
            const command = interaction.client.commands.get(commandName);
            
            if (!command) {
                const errorEmbed = EmbedUtils.createErrorEmbed(
                    'Command Not Found',
                    `No command with the name \`${commandName}\` was found.`
                );
                return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
            
            const helpEmbed = EmbedUtils.createCommandHelpEmbed(command);
            return interaction.reply({ embeds: [helpEmbed] });
        }
        
        // General help embed
        const commands = interaction.client.commands;
        const categories = {};
        
        // Organize commands by category
        commands.forEach(command => {
            const commandPath = command.data.name;
            let category = 'Utility'; // Default category
            
            // Determine category based on command location/name
            if (commandPath.includes('starwars') || ['quote'].includes(command.data.name)) {
                category = 'Star Wars';
            } else if (['ping', 'info', 'help'].includes(command.data.name)) {
                category = 'Utility';
            }
            
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(command);
        });
        
        const embed = EmbedUtils.createEmbed({
            title: '📖 Bot Commands',
            description: `Use \`/help <command>\` for detailed information about a specific command.\n\n**Total Commands:** ${commands.size}`,
            color: config.colors.primary,
            footer: 'May the Force be with you!'
        });
        
        // Add fields for each category
        Object.entries(categories).forEach(([categoryName, categoryCommands]) => {
            const categoryConfig = config.categories[categoryName.toLowerCase().replace(' ', '')] || { emoji: '📁' };
            const commandList = categoryCommands
                .map(cmd => `\`/${cmd.data.name}\` - ${cmd.data.description}`)
                .join('\n');
            
            embed.addFields({
                name: `${categoryConfig.emoji} ${categoryName}`,
                value: commandList,
                inline: false
            });
        });
        
        await interaction.reply({ embeds: [embed] });
    },
};
