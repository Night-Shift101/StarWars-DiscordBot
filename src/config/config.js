module.exports = {
    bot: {
        name: 'StarWars Bot',
        version: '1.0.0',
        description: 'A comprehensive Star Wars Discord bot',
        author: 'NightShift101',
        prefix: '!', // Fallback prefix for legacy commands if needed
    },
    
    // Bot permissions and features
    features: {
        slash_commands: true,
        legacy_commands: false,
        auto_responses: true,
        moderation: false, // Can be enabled later
        music: false, // Can be enabled later
        economy: false, // Can be enabled later
    },
    
    // Command categories
    categories: {
        starwars: {
            name: 'Star Wars',
            description: 'Commands related to the Star Wars universe',
            emoji: '⭐',
        },
        utility: {
            name: 'Utility', 
            description: 'General utility commands',
            emoji: '🔧',
        },
        fun: {
            name: 'Fun',
            description: 'Fun and entertainment commands',
            emoji: '🎉',
        },
        moderation: {
            name: 'Moderation',
            description: 'Server moderation commands',
            emoji: '🛡️',
        },
    },
    
    // Embed colors
    colors: {
        primary: 0x0099FF,
        success: 0x00FF00,
        warning: 0xFFFF00,
        error: 0xFF0000,
        starwars: 0xFFD700,
        jedi: 0x0066CC,
        sith: 0xFF0000,
        empire: 0x333333,
        rebel: 0xFF6600,
    },
    
    // Cooldowns (in seconds)
    cooldowns: {
        default: 3,
        quote: 5,
        ping: 2,
        info: 10,
    },
    
    // Error messages
    messages: {
        errors: {
            no_permission: 'You do not have permission to use this command.',
            cooldown: 'Please wait {time} more seconds before using this command again.',
            missing_args: 'Missing required arguments for this command.',
            bot_missing_perms: 'I do not have the required permissions to execute this command.',
            command_error: 'An error occurred while executing this command.',
        },
        success: {
            command_executed: 'Command executed successfully.',
        },
    },
};
