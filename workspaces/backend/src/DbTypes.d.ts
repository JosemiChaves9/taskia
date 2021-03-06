export interface DbUser {
  _id: string;
  name: string;
  email: string;
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

export interface GenericDbResponse {
  ok: boolean;
  err: string;
  updated?: DbProject;
}

export interface SignupDbResponse {
  ok: boolean;
  err: string;
  newUserId: string;
}
