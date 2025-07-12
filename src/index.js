require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
const Logger = require('./utils/logger');

class DiscordBot {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates
            ]
        });

        this.client.commands = new Collection();
        this.client.events = new Collection();
        
        this.logger = new Logger();
        this.init();
    }

    async init() {
        await this.loadCommands();
        await this.loadEvents();
        await this.login();
    }

    async loadCommands() {
        const commandsPath = path.join(__dirname, 'commands');
        
        if (!fs.existsSync(commandsPath)) {
            this.logger.warn('Commands directory not found, creating it...');
            fs.mkdirSync(commandsPath, { recursive: true });
            return;
        }

        const commandFolders = fs.readdirSync(commandsPath);

        for (const folder of commandFolders) {
            const folderPath = path.join(commandsPath, folder);
            const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(folderPath, file);
                try {
                    const command = require(filePath);
                    
                    if ('data' in command && 'execute' in command) {
                        this.client.commands.set(command.data.name, command);
                        this.logger.info(`Loaded command: ${command.data.name}`);
                    } else {
                        this.logger.warn(`Command at ${filePath} is missing required "data" or "execute" property.`);
                    }
                } catch (error) {
                    this.logger.error(`Error loading command ${file}:`, error);
                }
            }
        }
    }

    async loadEvents() {
        const eventsPath = path.join(__dirname, 'events');
        
        if (!fs.existsSync(eventsPath)) {
            this.logger.warn('Events directory not found, creating it...');
            fs.mkdirSync(eventsPath, { recursive: true });
            return;
        }

        const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

        for (const file of eventFiles) {
            const filePath = path.join(eventsPath, file);
            try {
                const event = require(filePath);
                
                if (event.once) {
                    this.client.once(event.name, (...args) => event.execute(...args, this.client));
                } else {
                    this.client.on(event.name, (...args) => event.execute(...args, this.client));
                }
                
                this.logger.info(`Loaded event: ${event.name}`);
            } catch (error) {
                this.logger.error(`Error loading event ${file}:`, error);
            }
        }
    }

    async login() {
        try {
            await this.client.login(process.env.DISCORD_TOKEN);
        } catch (error) {
            this.logger.error('Failed to login:', error);
            process.exit(1);
        }
    }

    // Graceful shutdown
    shutdown() {
        this.logger.info('Shutting down bot...');
        this.client.destroy();
        process.exit(0);
    }
}

// Handle process termination
process.on('SIGINT', () => {
    if (global.bot) {
        global.bot.shutdown();
    } else {
        process.exit(0);
    }
});

process.on('SIGTERM', () => {
    if (global.bot) {
        global.bot.shutdown();
    } else {
        process.exit(0);
    }
});

// Start the bot
const bot = new DiscordBot();
global.bot = bot;

module.exports = DiscordBot;
