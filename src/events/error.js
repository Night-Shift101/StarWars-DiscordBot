const { Events } = require('discord.js');

module.exports = {
    name: Events.Error,
    execute(error, client) {
        console.error('Discord.js error:', error);
    },
};
