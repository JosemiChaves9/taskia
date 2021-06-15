import { Db, MongoClient } from 'mongodb';
import { user } from '../types';

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
    await DbService.getDb().collection('users').insertOne({ name, email });
  }

  static async getUserByEmail(email: string): Promise<user> {
    return await DbService.getDb().collection('users').findOne({ email });
  }

  static async newTask(name: string) {
    await DbService.getDb().collection('tasks').insertOne({ name });
  }

  static async newProject(name: string) {
    await DbService.getDb().collection('projects').insertOne({ name });
  }

  private static getDb(): Db {
    if (!db) {
      throw new Error("Can't get db");
    } else {
      return db;
    }
  }
}
