import winston from "winston";
import "winston-daily-rotate-file";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new (<any>winston.transports).DailyRotateFile({
      filename: "./logs/%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d"
    })
  ]
});

export default logger;
