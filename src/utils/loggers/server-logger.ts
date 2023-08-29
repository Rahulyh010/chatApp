import "winston-mongodb";

import winston from "winston";

const mongoTransport = new winston.transports.MongoDB({
  db: process.env.DB_URI as string,
  collection: "server_logs",
  level: "error",
  label: "CHAT_SERVER",
  options: {
    useUnifiedTopology: true,
  },
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize({
          all: true,
        }),
        winston.format.timestamp({
          format: "YYYY-MM-DD hh:mm:ss",
        }),
        winston.format.simple(),
        winston.format.printf((info: any) => {
          return `[${info.timestamp as string}] ${info.level as string} : ${
            info.message as string
          } ${
            Object.keys(info.metadata).length ? JSON.stringify(info.meta) : ""
          }`;
        })
      ),
    }),
    mongoTransport,
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.metadata({
      fillExcept: ["message", "level", "timestamp", "label"],
    })
  ),
});

export default logger;
