import { DbService } from './DbService';

let db: DbService | undefined;
export class DbServiceSingleton {
  static getInstance() {
    if (db) {
      return db;
    } else {
      return (db = createDbService());
    }
  }
}

export const createDbService = () => {
  return new DbService();
};
