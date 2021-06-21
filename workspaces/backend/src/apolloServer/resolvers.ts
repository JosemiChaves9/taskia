import { IResolvers } from 'apollo-server';
import { joinToExistingProject } from '../gql/mutations/projectMutations/joinToExistingProject';
import { newProject } from '../gql/mutations/projectMutations/newProject';
import { markTaskAsCompleted } from '../gql/mutations/taskMutations/markTaskAsCompleted';
import { newTask } from '../gql/mutations/taskMutations/newTask';
import { signup } from '../gql/mutations/userMutations/signup';
import { getAllUserProjects } from '../gql/queries/projectQueries/getAllUserProjects';
import { getProjectById } from '../gql/queries/projectQueries/getProjectById';
import { getUserByEmail } from '../gql/queries/userQueries/getUserByEmail';

export const resolvers: IResolvers = {
  Query: {
    getUserByEmail: getUserByEmail,
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
};
