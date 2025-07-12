#!/usr/bin/env node

/**
 * Command Generator Script
 * Quickly generate new command files with proper structure
 */

const fs = require('fs');
const path = require('path');

function generateCommand(commandName, category = 'utility', description = 'A new command') {
    const commandsDir = path.join(__dirname, 'src', 'commands', category);
    const commandFile = path.join(commandsDir, `${commandName}.js`);

    // Create category directory if it doesn't exist
    if (!fs.existsSync(commandsDir)) {
        fs.mkdirSync(commandsDir, { recursive: true });
        console.log(`📁 Created category directory: ${category}`);
    }

    // Check if command already exists
    if (fs.existsSync(commandFile)) {
        console.log(`❌ Command ${commandName} already exists in category ${category}`);
        return;
    }

    const template = `const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { createEmbed } = require('../../utils/embeds');
const config = require('../../config/config');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('${commandName}')
        .setDescription('${description}'),
    
    cooldown: config.cooldowns.default,
    category: '${category}',
    
    async execute(interaction) {
        try {
            // TODO: Implement your command logic here
            const embed = createEmbed()
                .setTitle('${commandName.charAt(0).toUpperCase() + commandName.slice(1)} Command')
                .setDescription('This is a placeholder for the ${commandName} command.')
                .setColor(config.colors.primary);

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(\`Error in ${commandName} command:\`, error);
            
            const errorEmbed = createEmbed()
                .setTitle('Error')
                .setDescription('An error occurred while executing this command.')
                .setColor(config.colors.error);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
            } else {
                await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            }
        }
    },
};`;

    fs.writeFileSync(commandFile, template);
    console.log(`✅ Created command: ${commandName} in category ${category}`);
    console.log(`📝 File: ${commandFile}`);
    console.log(`\n🔧 Next steps:`);
    console.log(`   1. Edit the command file to implement your logic`);
    console.log(`   2. Run: npm run deploy`);
    console.log(`   3. Test your command in Discord`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('🚀 Discord Command Generator');
    console.log('=============================\n');
    console.log('Usage: node generate-command.js <command-name> [category] [description]');
    console.log('\nExamples:');
    console.log('  node generate-command.js hello');
    console.log('  node generate-command.js modkick moderation "Kick a user from the server"');
    console.log('  node generate-command.js play music "Play a song"');
    console.log('\nAvailable categories:');
    console.log('  - utility (default)');
    console.log('  - starwars');
    console.log('  - moderation');
    console.log('  - fun');
    console.log('  - music');
    console.log('  - economy');
    process.exit(0);
}

const [commandName, category = 'utility', description = 'A new command'] = args;

// Validate command name
if (!/^[a-z0-9_-]+$/.test(commandName)) {
    console.log('❌ Invalid command name. Use only lowercase letters, numbers, hyphens, and underscores.');
    process.exit(1);
}

generateCommand(commandName, category, description);
