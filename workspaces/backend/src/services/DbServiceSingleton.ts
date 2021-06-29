import { DbService } from './DbService';

let db: any;
export class DbServiceSingleton {
  static getInstance() {
    if (db) {
      return db;
    } else {
      db = createDbService();
    }
  }
}

export const createDbService = () => {
  return new DbService();
};
