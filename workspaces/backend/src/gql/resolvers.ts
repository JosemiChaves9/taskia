import { IResolvers } from 'apollo-server';
import { getProjectById } from './getProjectById';
import { getAllUserProjects } from './getAllUserProjects';
import { getUserByEmail } from './getUserByEmail';
import { newProject } from './newProject';
import { newTask } from './newTask';
import { signup } from './signup';
import { markTaskAsCompleted } from './markTaskAsCompleted';
import { joinToExistingProject } from './joinToExistingProject';

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
