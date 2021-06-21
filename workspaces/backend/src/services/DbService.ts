import { Db, MongoClient, ObjectID } from 'mongodb';
import { DbProject, DbUser } from '../DbTypes';

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
    //! This one should be asyncronous
    return await DbService.getDb()
      .collection('users')
      .insertOne({ name, email })
      .then((res) => {
        DbService.getDb()
          .collection('projects')
          .insertOne({ name: 'Default', participants: [res.insertedId] });
      });
  }

  static getUserByEmail(email: string): Promise<DbUser | null> {
    return DbService.getDb()
      .collection('users')
      .findOne({ email }, { timeout: true });
  }

  static newTask(taskName: string, projectId: string) {
    return DbService.getDb()
      .collection('projects')
      .findOneAndUpdate(
        {
          _id: new ObjectID(projectId),
        },
        {
          $push: {
            tasks: { _id: new ObjectID(), name: taskName, completed: false },
          },
        },
        { upsert: true }
      );
  }

  static newProject(projectName: string, userId: string, shareCode: number) {
    return DbService.getDb()
      .collection('projects')
      .insertOne({
        name: projectName,
        participants: [new ObjectID(userId)],
        tasks: [],
        shareCode: shareCode,
      });
  }

  static getAllUserProjects(userId: string): Promise<DbProject[] | null> {
    return DbService.getDb()
      .collection('projects')
      .find({
        participants: { $in: [new ObjectID(userId)] },
      })
      .toArray();
  }

  static getProjectById(projectId: string): Promise<DbProject> {
    return DbService.getDb()
      .collection('projects')
      .findOne({
        _id: new ObjectID(projectId),
      });
  }
  static markTaskAsCompleted(projectId: string, taskId: string) {
    return DbService.getDb()
      .collection('projects')
      .updateOne(
        {
          _id: new ObjectID(projectId),
          'tasks._id': new ObjectID(taskId),
        },
        {
          $set: { 'tasks.$.completed': true },
        }
      );
  }

  static getProjectByShareCode(shareCode: number): Promise<DbProject> {
    return DbService.getDb().collection('projects').findOne({
      shareCode: shareCode,
    });
  }

  static joinToAnExistingProject(shareCode: number, userId: string) {
    return DbService.getDb()
      .collection('projects')
      .findOneAndUpdate(
        { shareCode: shareCode },
        {
          $push: {
            participants: new ObjectID(userId),
          },
        }
      );
  }

  private static getDb(): Db {
    if (!db) {
      throw new Error("Can't get db");
    } else {
      return db;
    }
  }
}
