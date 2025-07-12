const { Events } = require('discord.js');
const CooldownManager = require('../utils/cooldown');
const EmbedUtils = require('../utils/embeds');
const config = require('../config/config');

const cooldownManager = new CooldownManager();

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        // Check cooldown
        const cooldownTime = command.cooldown || config.cooldowns.default;
        const cooldownCheck = cooldownManager.checkCooldown(
            interaction.user.id,
            interaction.commandName,
            cooldownTime
        );

        if (cooldownCheck.isOnCooldown) {
            const cooldownEmbed = EmbedUtils.createWarningEmbed(
                'Cooldown Active',
                `Please wait ${cooldownCheck.timeLeft} more seconds before using this command again.`
            );
            
            return interaction.reply({ 
                embeds: [cooldownEmbed], 
                ephemeral: true 
            });
        }

        try {
            await command.execute(interaction);
            
            // Set cooldown after successful execution
            cooldownManager.setCooldown(interaction.user.id, interaction.commandName);
        } catch (error) {
            console.error('Error executing command:', error);
            
            const errorEmbed = EmbedUtils.createErrorEmbed(
                'Command Error',
                'There was an error while executing this command!'
            );

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ 
                    embeds: [errorEmbed], 
                    ephemeral: true 
                });
            } else {
                await interaction.reply({ 
                    embeds: [errorEmbed], 
                    ephemeral: true 
                });
            }
        }
    },
};
