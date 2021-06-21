import { Db, MongoClient, ObjectID } from 'mongodb';
import { Project, User } from '../types';

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
      .insertOne({ name, email })
      .then((res) =>
        DbService.getDb()
          .collection('projects')
          .insertOne({ name: 'Default', participants: [res.insertedId] })
      );
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    return await DbService.getDb()
      .collection('users')
      .findOne({ email }, { timeout: true });
  }

  static async newTask(taskName: string, projectId: string) {
    await DbService.getDb()
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

  static async newProject(
    projectName: string,
    userId: string,
    shareCode: number
  ) {
    await DbService.getDb()
      .collection('projects')
      .insertOne({
        name: projectName,
        participants: [new ObjectID(userId)],
        tasks: [],
        shareCode: shareCode,
      });
  }

  static async getAllUserProjects(userId: string): Promise<Project[] | null> {
    return await DbService.getDb()
      .collection('projects')
      .find({
        participants: { $in: [new ObjectID(userId)] },
      })
      .toArray();
  }

  static async getProjectById(projectId: string): Promise<Project> {
    return await DbService.getDb()
      .collection('projects')
      .findOne({
        _id: new ObjectID(projectId),
      });
  }
  static async markTaskAsCompleted(projectId: string, taskId: string) {
    await DbService.getDb()
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

  static async getProjectByShareCode(shareCode: number): Promise<Project> {
    return await DbService.getDb().collection('projects').findOne({
      shareCode: shareCode,
    });
  }

  static async joinToAnExistingProject(shareCode: number, userId: string) {
    await DbService.getDb()
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
