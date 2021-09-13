import {
  Db,
  FindAndModifyWriteOpResultObject,
  FindOneAndDeleteOption,
  FindOneAndUpdateOption,
  InsertOneWriteOpResult,
  MongoClient,
  ObjectID,
  UpdateOneOptions,
  UpdateWriteOpResult,
} from 'mongodb';
import { DbProject, DbTask, DbUser, GenericDbResponse } from '../DbTypes';
import { EnviromentVariables } from './EnviromentVariablesService';

export class DbService {
  private db: Db | null = null;
  connect() {
    return new Promise<void>((res, rej) => {
      const client = new MongoClient(
        EnviromentVariables.getMongoDbUri() as string,
        { useNewUrlParser: true, useUnifiedTopology: true }
      );
      client.connect((err) => {
        if (err) {
          rej(err);
        } else {
          this.db = client.db(EnviromentVariables.getDbName());
          res();
        }
      });
    });
  }

  newUser(email: string, name: string, shareCode: number): Promise<string> {
    return this.getDb()
      .collection('users')
      .insertOne({ name, email })
      .then((res) => {
        return this.getDb()
          .collection('projects')
          .insertOne({
            name: 'Default',
            participants: [res.insertedId],
            shareCode: shareCode,
          })
          .then(() => {
            return res.insertedId;
          });
      });
  }

  getUserByEmail(email: string): Promise<DbUser> {
    return this.getDb().collection('users').findOne({ email });
  }

  getUserById(userId: string): Promise<DbUser> {
    return this.getDb().collection('users').findOne(new ObjectID(userId));
  }

  newTask(
    taskName: string,
    projectId: string
  ): Promise<FindAndModifyWriteOpResultObject<DbTask>> {
    return this.getDb()
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

  newProject(
    projectName: string,
    userId: string,
    shareCode: number
  ): Promise<InsertOneWriteOpResult<DbProject>> {
    return this.getDb()
      .collection('projects')
      .insertOne({
        name: projectName,
        participants: [new ObjectID(userId)],
        tasks: [],
        shareCode: shareCode,
      });
  }

  getAllUserProjects(userId: string): Promise<DbProject[]> {
    return this.getDb()
      .collection('projects')
      .find({
        participants: { $in: [new ObjectID(userId)] },
      })
      .toArray();
  }

  getProjectById(projectId: string): Promise<DbProject> {
    return this.getDb()
      .collection('projects')
      .findOne({
        _id: new ObjectID(projectId),
      });
  }

  markTaskAsCompleted(
    projectId: string,
    taskId: string
  ): Promise<UpdateWriteOpResult> {
    return this.getDb()
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

  markTaskAsUncompleted(
    projectId: string,
    taskId: string
  ): Promise<UpdateWriteOpResult> {
    return this.getDb()
      .collection('projects')
      .updateOne(
        {
          _id: new ObjectID(projectId),
          'tasks._id': new ObjectID(taskId),
        },
        {
          $set: { 'tasks.$.completed': false },
        }
      );
  }

  getProjectByShareCode(shareCode: number): Promise<DbProject> {
    return this.getDb().collection('projects').findOne({
      shareCode: shareCode,
    });
  }

  joinToAnExistingProject(
    shareCode: number,
    userId: string
  ): Promise<FindAndModifyWriteOpResultObject<DbProject>> {
    return this.getDb()
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

  deleteProject(
    projectId: string
  ): Promise<FindAndModifyWriteOpResultObject<DbProject>> {
    return this.getDb()
      .collection('projects')
      .findOneAndDelete({ _id: new ObjectID(projectId) });
  }

  changeProjectName(
    projectId: string,
    newProjectName: string
  ): Promise<FindAndModifyWriteOpResultObject<DbProject>> {
    return this.getDb()
      .collection('projects')
      .findOneAndUpdate(
        { _id: new ObjectID(projectId) },
        {
          $set: {
            name: newProjectName,
          },
        }
      );
  }

  private getDb(): Db {
    if (!this.db) {
      throw new Error("Can't get db");
    } else {
      return this.db;
    }
  }
}
