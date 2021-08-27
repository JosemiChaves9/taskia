export interface DbUser {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export interface DbProject {
  _id: string;
  name: string;
  participants: [string];
  tasks?: [DbTask];
  shareCode: number;
}

export interface DbTask {
  _id: string;
  name: string;
  completed: boolean;
}

export interface DbFindAndModifyReponse {
  lastErrorObject: {
    n: number;
    updatedExisting: boolean;
  };
  value: DbProject;
  ok: number;
}

export interface GenericDbResponse {
  ok: boolean;
  err: string;
  updated?: DbProject;
}
