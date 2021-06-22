import { createLogger, format, transports } from 'winston';
const { printf } = format;

const myFormat = printf(({ level, message, stack }) => {
  return `${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: 'silly',
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    myFormat
  ),

  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
});
