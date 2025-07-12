const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m'
};

class Logger {
    constructor() {
        this.logLevel = process.env.LOG_LEVEL || 'info';
        this.levels = {
            error: 0,
            warn: 1,
            info: 2,
            debug: 3
        };
    }

    shouldLog(level) {
        return this.levels[level] <= this.levels[this.logLevel];
    }

    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        const levelUpper = level.toUpperCase();
        
        let colorCode;
        switch (level) {
            case 'error':
                colorCode = colors.red;
                break;
            case 'warn':
                colorCode = colors.yellow;
                break;
            case 'info':
                colorCode = colors.green;
                break;
            case 'debug':
                colorCode = colors.cyan;
                break;
            default:
                colorCode = colors.white;
        }

        return `${colors.dim}${timestamp}${colors.reset} ${colorCode}[${levelUpper}]${colors.reset} ${message}`;
    }

    error(message, ...args) {
        if (this.shouldLog('error')) {
            console.error(this.formatMessage('error', message), ...args);
        }
    }

    warn(message, ...args) {
        if (this.shouldLog('warn')) {
            console.warn(this.formatMessage('warn', message), ...args);
        }
    }

    info(message, ...args) {
        if (this.shouldLog('info')) {
            console.log(this.formatMessage('info', message), ...args);
        }
    }

    debug(message, ...args) {
        if (this.shouldLog('debug')) {
            console.log(this.formatMessage('debug', message), ...args);
        }
    }
}

module.exports = Logger;
