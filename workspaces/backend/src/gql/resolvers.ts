import { IResolvers } from 'apollo-server';
import { getProject } from './getProject';
import { getProjectForUser } from './getProjectsforUser';
import { getUser } from './getUser';
import { newProject } from './newProject';
import { newTask } from './newTask';
import { signup } from './signup';
import { test } from './test';

export const resolvers: IResolvers = {
  Query: {
    getUser: getUser,
    getProjectsByEmail: getProjectForUser,
    test: test,
    getProject: getProject,
  },
  Mutation: {
    signup: signup,
    newTask: newTask,
    newProject: newProject,
  },
};
