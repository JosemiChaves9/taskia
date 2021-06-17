import { IResolvers } from 'apollo-server';
import { getProject } from './getProject';
import { getAllProjectForUser } from './getProjectsforUser';
import { getUser } from './getUser';
import { newProject } from './newProject';
import { newTask } from './newTask';
import { signup } from './signup';

export const resolvers: IResolvers = {
  Query: {
    getUser: getUser,
    getAllProjectForUser: getAllProjectForUser,
    getProject: getProject,
  },
  Mutation: {
    signup: signup,
    newTask: newTask,
    newProject: newProject,
  },
};
