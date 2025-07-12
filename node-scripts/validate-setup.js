const fs = require('fs');
const path = require('path');

console.log('🔍 Validating Discord Bot Setup...\n');

// Check required environment variables
const requiredEnvVars = ['DISCORD_TOKEN', 'CLIENT_ID'];
const missingEnvVars = [];

console.log('📋 Checking environment variables...');
requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        missingEnvVars.push(envVar);
        console.log(`❌ ${envVar} - Missing`);
    } else {
        console.log(`✅ ${envVar} - Set`);
    }
});

// Check project structure
console.log('\n📁 Checking project structure...');
const requiredDirs = [
    'src',
    'src/commands',
    'src/commands/utility',
    'src/commands/starwars',
    'src/events',
    'src/utils',
    'src/config'
];

const requiredFiles = [
    'src/index.js',
    'src/events/ready.js',
    'src/events/interactionCreate.js',
    'src/commands/utility/ping.js',
    'src/commands/utility/info.js',
    'src/commands/utility/help.js',
    'src/commands/starwars/quote.js',
    'src/utils/logger.js',
    'src/utils/cooldown.js',
    'src/utils/embeds.js',
    'src/config/config.js',
    'deploy-commands.js',
    '.env.example'
];

let structureValid = true;

requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ Directory: ${dir}`);
    } else {
        console.log(`❌ Directory: ${dir} - Missing`);
        structureValid = false;
    }
});

requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ File: ${file}`);
    } else {
        console.log(`❌ File: ${file} - Missing`);
        structureValid = false;
    }
});

// Check package.json dependencies
console.log('\n📦 Checking dependencies...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredDeps = ['discord.js', 'dotenv'];
    const requiredDevDeps = ['nodemon', 'eslint', 'prettier', 'jest'];
    
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies && packageJson.dependencies[dep]) {
            console.log(`✅ Dependency: ${dep}`);
        } else {
            console.log(`❌ Dependency: ${dep} - Missing`);
            structureValid = false;
        }
    });
    
    requiredDevDeps.forEach(dep => {
        if (packageJson.devDependencies && packageJson.devDependencies[dep]) {
            console.log(`✅ Dev Dependency: ${dep}`);
        } else {
            console.log(`❌ Dev Dependency: ${dep} - Missing`);
            structureValid = false;
        }
    });
} catch (error) {
    console.log('❌ Error reading package.json:', error.message);
    structureValid = false;
}

// Summary
console.log('\n📊 Validation Summary:');
console.log('='.repeat(50));

if (missingEnvVars.length > 0) {
    console.log(`❌ Missing environment variables: ${missingEnvVars.join(', ')}`);
    console.log('   Please copy .env.example to .env and fill in your bot credentials.');
}

if (structureValid && missingEnvVars.length === 0) {
    console.log('✅ All checks passed! Your bot setup is ready.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Fill in your Discord bot credentials in .env');
    console.log('   3. Run: node deploy-commands.js');
    console.log('   4. Run: npm run dev');
} else if (structureValid) {
    console.log('⚠️  Project structure is valid, but environment setup is incomplete.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Fill in your Discord bot credentials in .env');
    console.log('   3. Run: node deploy-commands.js');
    console.log('   4. Run: npm run dev');
} else {
    console.log('❌ Setup validation failed. Please check the missing items above.');
}

console.log('\n🌟 May the Force be with you!');
