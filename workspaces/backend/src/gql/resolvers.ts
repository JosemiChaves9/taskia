import { IResolvers } from 'apollo-server';
import { getUser } from './getUser';
import { signup } from './signup';

export const resolvers: IResolvers = {
  Query: {
    user: getUser,
  },
  Mutation: {
    signup: signup,
  },
};
