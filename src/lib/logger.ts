import winston from "winston";

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

export const debug = winston.createLogger({
  level: "verbose",
  transports: [new winston.transports.Console()],
  format: winston.format.combine(winston.format.prettyPrint()),
});
