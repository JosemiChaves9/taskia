require('dotenv').config();

export class EnviromentVariables {
  static getMongoDbUri() {
    return process.env.MONGODB_URI;
  }

  static getDbName() {
    return process.env.DB_NAME;
  }
}
