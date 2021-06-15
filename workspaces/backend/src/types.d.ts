export interface user {
  _id: string;
  name: string;
  email: string;
  projects?: [project] | null;
}

export interface project {
  _id: string;
  name: string;
  participants: [string];
  tasks: [task];
}

export interface task {
  _id: string;
  name: string;
  completed: boolean;
}
