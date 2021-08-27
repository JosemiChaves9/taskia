import { IResolvers } from 'apollo-server';
import { PubSubSingleton } from '../services/pubSubSignleton';
import { joinToExistingProject } from './gql/mutations/project/joinToExistingProject';
import { newProject } from './gql/mutations/project/newProject';
import { markTaskAsCompleted } from './gql/mutations/task/markTaskAsCompleted';
import { newTask } from './gql/mutations/task/newTask';
import { signup } from './gql/mutations/user/signup';
import { getAllUserProjects } from './gql/queries/project/getAllUserProjects';
import { getProjectById } from './gql/queries/project/getProjectById';
import { getUserByEmail } from './gql/queries/user/getUserByEmail';
import { getUserById } from './gql/queries/user/getUserById';

export const resolvers: IResolvers = {
  Query: {
    getUserByEmail: getUserByEmail,
    getUserById: getUserById,
    getProjectById: getProjectById,
    getAllUserProjects: getAllUserProjects,
  },
  Mutation: {
    signup: signup,
    newTask: newTask,
    newProject: newProject,
    markTaskAsCompleted: markTaskAsCompleted,
    joinToExistingProject: joinToExistingProject,
  },
  Subscription: {
    changesInProject: {
      subscribe: () =>
        PubSubSingleton.getInstance().asyncIterator('CHANGES_IN_PROJECT'),
    },
    changesInTask: {
      subscribe: () =>
        PubSubSingleton.getInstance().asyncIterator('CHANGES_IN_TASK'),
    },
  },
};
