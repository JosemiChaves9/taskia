export interface User {
  _id: string;
  name: string;
  email: string;
  projects?: [project];
}

export interface Project {
  _id: string;
  name: string;
  participants: [string];
  tasks: [task];
  shareCode: number;
}

export interface Task {
  _id: string;
  name: string;
  completed: boolean;
}
