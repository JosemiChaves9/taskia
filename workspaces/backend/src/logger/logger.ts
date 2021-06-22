import { createLogger, format, transports } from 'winston';
import { EnviromentVariables } from '../services/EnviromentVariablesService';
const { printf, prettyPrint } = format;

const myFormat = printf(({ level, message, stack }) => {
  return `${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: EnviromentVariables.getLogLevel(),
  format: format.combine(
    prettyPrint(),
    format.colorize(),
    format.errors({ stack: true }),
    myFormat
  ),

  transports: [new transports.Console()],
  exceptionHandlers: [new transports.Console()],
});
