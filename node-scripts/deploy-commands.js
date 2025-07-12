require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'src', 'commands');

// Function to recursively read command files
function loadCommandsFromDirectory(directory) {
    const items = fs.readdirSync(directory);
    
    for (const item of items) {
        const itemPath = path.join(directory, item);
        const stat = fs.statSync(itemPath);
        
        if (stat.isDirectory()) {
            loadCommandsFromDirectory(itemPath);
        } else if (item.endsWith('.js')) {
            const command = require(itemPath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.toJSON());
                console.log(`✅ Loaded command: ${command.data.name}`);
            } else {
                console.log(`⚠️  Skipping ${itemPath}: missing "data" or "execute" property`);
            }
        }
    }
}

// Load all commands
if (fs.existsSync(commandsPath)) {
    loadCommandsFromDirectory(commandsPath);
} else {
    console.error('❌ Commands directory not found!');
    process.exit(1);
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN);

// Deploy commands
(async () => {
    try {
        console.log(`🚀 Started refreshing ${commands.length} application (/) commands.`);

        let data;
        
        if (process.env.GUILD_ID) {
            // Deploy to specific guild (faster for development)
            data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                { body: commands },
            );
            console.log(`✅ Successfully reloaded ${data.length} guild application (/) commands.`);
        } else {
            // Deploy globally (takes up to 1 hour to update)
            data = await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID),
                { body: commands },
            );
            console.log(`✅ Successfully reloaded ${data.length} global application (/) commands.`);
        }
    } catch (error) {
        console.error('❌ Error deploying commands:', error);
    }
})();
