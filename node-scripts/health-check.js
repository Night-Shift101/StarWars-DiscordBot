#!/usr/bin/env node

/**
 * Health Check Script
 * Performs a quick connectivity test for the Discord bot
 */

require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const logger = require('./src/utils/logger');

async function healthCheck() {
    console.log('🔍 Discord Bot Health Check');
    console.log('============================\n');

    // Check environment variables
    const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
    const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

    if (missingVars.length > 0) {
        console.log('❌ Missing environment variables:', missingVars.join(', '));
        console.log('   Please check your .env file\n');
        process.exit(1);
    }

    console.log('✅ Environment variables found');

    // Test bot connection
    const client = new Client({
        intents: [GatewayIntentBits.Guilds]
    });

    try {
        console.log('🔗 Testing bot connection...');
        
        await client.login(process.env.DISCORD_TOKEN);
        
        await new Promise(resolve => {
            client.once('ready', () => {
                console.log(`✅ Bot connected successfully as ${client.user.tag}`);
                console.log(`📊 Connected to ${client.guilds.cache.size} guild(s)`);
                console.log(`🔗 Bot ID: ${client.user.id}`);
                console.log(`🌐 Latency: ${client.ws.ping}ms`);
                
                resolve();
            });
        });

        console.log('\n🎉 Health check passed! Your bot is ready to go.');
        
    } catch (error) {
        console.log('❌ Connection failed:', error.message);
        
        if (error.code === 'TokenInvalid') {
            console.log('   Please check your DISCORD_TOKEN in the .env file');
        }
        
        process.exit(1);
    } finally {
        if (client.isReady()) {
            await client.destroy();
        }
    }
}

// Handle process termination gracefully
process.on('SIGINT', () => {
    console.log('\n🛑 Health check interrupted');
    process.exit(0);
});

process.on('unhandledRejection', (error) => {
    console.error('❌ Unhandled error during health check:', error);
    process.exit(1);
});

// Run the health check
healthCheck().catch(console.error);
