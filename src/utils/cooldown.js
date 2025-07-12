const { Collection } = require('discord.js');

class CooldownManager {
    constructor() {
        this.cooldowns = new Collection();
    }

    /**
     * Check if a user is on cooldown for a command
     * @param {string} userId - The user's ID
     * @param {string} commandName - The command name
     * @param {number} cooldownTime - Cooldown time in seconds
     * @returns {object} - Object containing isOnCooldown and timeLeft
     */
    checkCooldown(userId, commandName, cooldownTime) {
        const now = Date.now();
        const timestamps = this.cooldowns.get(commandName) || new Collection();
        const cooldownAmount = cooldownTime * 1000;

        if (timestamps.has(userId)) {
            const expirationTime = timestamps.get(userId) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return {
                    isOnCooldown: true,
                    timeLeft: Math.ceil(timeLeft)
                };
            }
        }

        return {
            isOnCooldown: false,
            timeLeft: 0
        };
    }

    /**
     * Set a cooldown for a user and command
     * @param {string} userId - The user's ID
     * @param {string} commandName - The command name
     */
    setCooldown(userId, commandName) {
        const now = Date.now();
        const timestamps = this.cooldowns.get(commandName) || new Collection();
        
        timestamps.set(userId, now);
        this.cooldowns.set(commandName, timestamps);

        // Clean up expired cooldowns
        setTimeout(() => {
            const commandTimestamps = this.cooldowns.get(commandName);
            if (commandTimestamps) {
                commandTimestamps.delete(userId);
                if (commandTimestamps.size === 0) {
                    this.cooldowns.delete(commandName);
                }
            }
        }, 60000); // Clean up after 1 minute
    }

    /**
     * Clear all cooldowns for a command
     * @param {string} commandName - The command name
     */
    clearCommandCooldowns(commandName) {
        this.cooldowns.delete(commandName);
    }

    /**
     * Clear all cooldowns for a user
     * @param {string} userId - The user's ID
     */
    clearUserCooldowns(userId) {
        for (const [commandName, timestamps] of this.cooldowns) {
            timestamps.delete(userId);
            if (timestamps.size === 0) {
                this.cooldowns.delete(commandName);
            }
        }
    }
}

module.exports = CooldownManager;
