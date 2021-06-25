import { DbService } from "./DbService"

export class DbServiceSingleton {
    static getInstance() {
        
    }
}

export const createDbService = () => {
    return new DbService();
}