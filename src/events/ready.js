const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
        console.log(`🚀 Serving ${client.guilds.cache.size} guild(s) with ${client.users.cache.size} user(s)`);
        
        // Set bot activity
        client.user.setActivity('Star Wars Galaxy', { type: 'WATCHING' });
    },
};
