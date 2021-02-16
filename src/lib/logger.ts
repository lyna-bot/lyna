import winston from "winston";

/**
 * Allows the bot to pipe status messages and other information in a format that
 * the bot admin can read. This is piped to stdout to make the output easy to
 * view.
 */
export const logger = winston.createLogger({
  level: "verbose",
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.padLevels(),
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
  ),
});

/**
 * A version of the logger specifically for debug purposes. References to this
 * function should not be left in production code.
 */
export const debug = winston.createLogger({
  level: "verbose",
  transports: [new winston.transports.Console()],
  format: winston.format.prettyPrint(),
});

/**
 * A wrapper for Winston's exception handler, allowing us to to pipe exceptions
 * to the console and optionally to external services.
 */
export const exception = winston.createLogger({
  level: "verbose",
  transports: [new winston.transports.Console()],
  exceptionHandlers: [new winston.transports.Console()],
  format: winston.format.prettyPrint(),
  exitOnError: false,
});
