const DiscordBot = require('../src/index');

describe('DiscordBot', () => {
    test('should be defined', () => {
        expect(DiscordBot).toBeDefined();
    });
    
    test('should be a function/class', () => {
        expect(typeof DiscordBot).toBe('function');
    });
});
