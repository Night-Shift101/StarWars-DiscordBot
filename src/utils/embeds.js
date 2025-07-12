const { EmbedBuilder } = require('discord.js');
const config = require('../config/config');

class EmbedUtils {
    /**
     * Create a basic embed with default styling
     * @param {object} options - Embed options
     * @returns {EmbedBuilder}
     */
    static createEmbed(options = {}) {
        const embed = new EmbedBuilder()
            .setColor(options.color || config.colors.primary)
            .setTimestamp();

        if (options.title) embed.setTitle(options.title);
        if (options.description) embed.setDescription(options.description);
        if (options.footer) embed.setFooter({ text: options.footer });
        if (options.author) embed.setAuthor(options.author);
        if (options.thumbnail) embed.setThumbnail(options.thumbnail);
        if (options.image) embed.setImage(options.image);
        if (options.fields) embed.addFields(options.fields);

        return embed;
    }

    /**
     * Create a success embed
     * @param {string} title - Embed title
     * @param {string} description - Embed description
     * @returns {EmbedBuilder}
     */
    static createSuccessEmbed(title, description) {
        return this.createEmbed({
            title: `✅ ${title}`,
            description,
            color: config.colors.success,
        });
    }

    /**
     * Create an error embed
     * @param {string} title - Embed title
     * @param {string} description - Embed description
     * @returns {EmbedBuilder}
     */
    static createErrorEmbed(title, description) {
        return this.createEmbed({
            title: `❌ ${title}`,
            description,
            color: config.colors.error,
        });
    }

    /**
     * Create a warning embed
     * @param {string} title - Embed title
     * @param {string} description - Embed description
     * @returns {EmbedBuilder}
     */
    static createWarningEmbed(title, description) {
        return this.createEmbed({
            title: `⚠️ ${title}`,
            description,
            color: config.colors.warning,
        });
    }

    /**
     * Create a Star Wars themed embed
     * @param {object} options - Embed options
     * @returns {EmbedBuilder}
     */
    static createStarWarsEmbed(options = {}) {
        return this.createEmbed({
            ...options,
            color: options.color || config.colors.starwars,
            footer: options.footer || 'May the Force be with you!',
        });
    }

    /**
     * Create a help embed for a command
     * @param {object} command - Command object
     * @returns {EmbedBuilder}
     */
    static createCommandHelpEmbed(command) {
        const embed = this.createEmbed({
            title: `📖 Help: /${command.data.name}`,
            description: command.data.description,
            color: config.colors.primary,
        });

        if (command.data.options && command.data.options.length > 0) {
            const options = command.data.options.map(option => {
                const required = option.required ? '**[Required]**' : '*[Optional]*';
                return `**${option.name}** ${required}\n${option.description}`;
            }).join('\n\n');

            embed.addFields({ name: 'Options', value: options });
        }

        return embed;
    }
}

module.exports = EmbedUtils;
