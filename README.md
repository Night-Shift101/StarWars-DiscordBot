# Discord StarWars Bot

A comprehensive Star Wars-themed Discord bot built with modern best practices and industry standards.

## 🚀 Features

- **Slash Commands**: Modern Discord slash command support
- **Modular Architecture**: Organized command and event structure
- **Error Handling**: Comprehensive error handling and logging
- **Environment Configuration**: Secure environment variable management
- **Code Quality**: ESLint and Prettier for consistent code style
- **Testing**: Jest testing framework setup
- **Development Tools**: Hot reloading with nodemon

## 📁 Project Structure

```
DiscordStarwars/
├── src/
│   ├── commands/
│   │   ├── starwars/
│   │   │   └── quote.js          # Star Wars quotes
│   │   └── utility/
│   │       ├── info.js           # Bot information
│   │       └── ping.js           # Latency check
│   ├── events/
│   │   ├── error.js              # Error handling
│   │   ├── interactionCreate.js  # Command interaction handler
│   │   └── ready.js              # Bot ready event
│   ├── utils/
│   │   └── logger.js             # Custom logger utility
│   └── index.js                  # Main bot file
├── tests/
│   └── bot.test.js               # Basic tests
├── .env.example                  # Environment variables template
├── .eslintrc.js                  # ESLint configuration
├── .prettierrc                   # Prettier configuration
├── deploy-commands.js            # Command deployment script
└── package.json                  # Dependencies and scripts
```

## 🛠️ Setup

### Prerequisites

- Node.js v18.0.0 or higher
- A Discord application and bot token

### Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Discord bot credentials:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   CLIENT_ID=your_client_id_here
   GUILD_ID=your_guild_id_here  # Optional: for faster development
   ```

3. **Deploy slash commands:**
   ```bash
   node deploy-commands.js
   ```

4. **Start the bot:**
   ```bash
   # Development (with hot reload)
   npm run dev
   
   # Production
   npm start
   ```

## 📋 Available Commands

### Utility Commands
- `/ping` - Check bot latency and response time
- `/info` - Display bot information and statistics

### Star Wars Commands
- `/quote` - Get a random Star Wars quote

## 🧪 Development

### Scripts

- `npm start` - Start the bot in production mode
- `npm run dev` - Start the bot in development mode with hot reload
- `npm test` - Run tests
- `npm run lint` - Check code style
- `npm run lint:fix` - Fix code style issues
- `npm run format` - Format code with Prettier
- `npm run validate` - Validate project setup and dependencies
- `npm run deploy` - Deploy slash commands to Discord
- `npm run health` - Perform bot connectivity health check
- `npm run generate` - Generate new command files with proper structure

### Quick Command Generation

Use the built-in command generator to quickly create new commands:

```bash
# Generate a basic utility command
npm run generate mycommand

# Generate a command in a specific category
npm run generate kick moderation "Kick a user from the server"

# Generate a music command
npm run generate play music "Play a song from YouTube"
```

### Adding New Commands Manually

1. Create a new file in the appropriate category folder under `src/commands/`
2. Use the following template:

```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commandname')
        .setDescription('Command description'),
    
    async execute(interaction) {
        await interaction.reply('Hello!');
    },
};
```

3. Redeploy commands: `node deploy-commands.js`

### Adding New Events

1. Create a new file in `src/events/`
2. Use the following template:

```javascript
const { Events } = require('discord.js');

module.exports = {
    name: Events.EventName,
    once: false, // Set to true for one-time events
    execute(arg1, arg2, client) {
        // Event logic here
    },
};
```

## 🔧 Configuration

### Environment Variables

- `DISCORD_TOKEN` - Your Discord bot token (required)
- `CLIENT_ID` - Your Discord application client ID (required for command deployment)
- `GUILD_ID` - Guild ID for faster command deployment during development (optional)
- `NODE_ENV` - Environment mode (development/production)
- `LOG_LEVEL` - Logging level (error/warn/info/debug)

### Intents

The bot is configured with the following intents:
- `Guilds` - Basic guild information
- `GuildMessages` - Read messages in guilds
- `MessageContent` - Access message content
- `GuildMembers` - Access member information
- `GuildVoiceStates` - Voice channel functionality

## 📝 Contributing

1. Follow the established code style (ESLint + Prettier)
2. Write tests for new features
3. Update documentation as needed
4. Follow the modular architecture pattern

## 📄 License

This project is licensed under the CC0 1.0 Universal License - see the [LICENSE](LICENSE) file for details.

## 🌟 May the Force be with you!

Built with ❤️ for the Star Wars community.
