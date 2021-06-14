import { Db, MongoClient } from 'mongodb';

let db: Db | undefined;
export class DbService {
  static async connect() {
    return new Promise<void>((res, rej) => {
      const client = new MongoClient(
        'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false'
      );
      client.connect((err) => {
        if (err) {
          rej(err);
        } else {
          db = client.db('taskia');
          console.log('💾  Database ready');
          res();
        }
      });
    });
  }

  static async newUser(email: string, name: string) {
    await DbService.getDb()
      .collection('users')
      .insertOne({ name: name, email: email });
  }

  static async getUserByEmail(email: string) {
    return await DbService.getDb()
      .collection('users')
      .findOne({ email: email });
  }

  private static getDb(): Db {
    if (!db) {
      throw new Error("Can't get db");
    } else {
      return db;
    }
  }
}
