import { logger } from '../logger/logger';

export class EnviromentVariables {
  static getMongoDbUri() {
    logger.debug(`ENV MONGODB_URI: ${process.env.MONGODB_URI}`);
    return process.env.MONGODB_URI;
  }

  static getDbName() {
    logger.debug(`ENV DB_NAME: ${process.env.DB_NAME}`);
    return process.env.DB_NAME;
  }

  static getLogLevel() {
    logger.debug(`ENV LOG_LEVEL: ${process.env.LOG_LEVEL}`);
    return process.env.LOG_LEVEL || 'warn';
  }
}
