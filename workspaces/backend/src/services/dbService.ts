import { Db, MongoClient } from 'mongodb';

let db: Db | undefined;
export class DbService {
  static async connect() {
    const uri =
      'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

    return new Promise<void>((res, rej) => {
      const client = new MongoClient(uri);
      client.connect((err) => {
        if (err) {
          rej(err);
        } else {
          db = client.db('taskia');
          console.log('💾  Database ready at port 27017');
          res();
        }
      });
    });
  }
  static test() {
    return DbService.getDb()
      .collection('testEntry')
      .findOne({ text: 'Hello Mongo!' });
  }

  static returnthings() {
    return {
      _id: 'dfds23',
      name: 'John Doe',
      email: 'john@doe.com',
      projects: [
        {
          _id: 'uie13',
          name: 'Project #1',
          owner: 'dfds23',
          tasks: [
            { _id: 'fu311', name: 'Buy groceries', owner: 'dfds23' },
            { _id: 'fu311', name: 'Buy groceries', owner: 'dfds23' },
            { _id: 'fu311', name: 'Buy groceries', owner: 'dfds23' },
          ],
        },
        {
          _id: 'dd895',
          name: 'Project #2',
          owner: 'fds65',
          tasks: [
            { _id: 'fu311', name: 'Buy groceries', owner: 'dfds23' },
            { _id: 'fu311', name: 'Buy groceries', owner: 'dfds23' },
            { _id: 'fu311', name: 'Buy groceries', owner: 'dfds23' },
          ],
        },
      ],
    };
  }

  private static getDb(): Db {
    if (!db) {
      throw new Error("Can't get db");
    } else {
      return db;
    }
  }
}
