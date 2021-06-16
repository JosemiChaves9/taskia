export interface User {
  _id: string;
  name: string;
  email: string;
  projects?: [Project];
}

export interface Project {
  _id: string;
  name: string;
  participants: [User];
  tasks: [Task];
}

export interface Task {
  _id: string;
  name: string;
  completed: boolean;
}
