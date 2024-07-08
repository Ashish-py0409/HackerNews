import winston from "winston";


class LoggerSingleton {
    private static instance: winston.Logger;
    private logger: winston.Logger;

    private constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            ),
            transports: [
                new winston.transports.Console(),
                // Add other transports as needed, e.g., log to a file
                // new winston.transports.File({ filename: 'test.log' })
            ]
        });
    }

    public static getInstance(): winston.Logger {
        if (!LoggerSingleton.instance) {
            LoggerSingleton.instance = new LoggerSingleton().logger;
        }
        return LoggerSingleton.instance;
    }
}

export default LoggerSingleton