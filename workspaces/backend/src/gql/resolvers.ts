import { IResolvers } from 'apollo-server';
import { getUser } from './getUser';
import { newProject } from './newProject';
import { newTask } from './newTask';
import { signup } from './signup';

export const resolvers: IResolvers = {
  Query: {
    getUser: getUser,
  },
  Mutation: {
    signup: signup,
    newTask: newTask,
    newProject: newProject,
  },
};
