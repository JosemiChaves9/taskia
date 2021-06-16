import { IResolvers } from 'apollo-server';
// import { getProjectForUser } from './getProjectsforUser';
import { getUser } from './getUser';
import { newProject } from './newProject';
import { newTask } from './newTask';
import { signup } from './signup';

export const resolvers: IResolvers = {
  Query: {
    getUser: getUser,
    // projects: getProjectForUser,
  },
  Mutation: {
    signup: signup,
    newTask: newTask,
    newProject: newProject,
  },
};
