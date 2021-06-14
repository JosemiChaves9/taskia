import { IResolvers } from 'apollo-server';
import { DbService } from '../services/dbService';

const user = {
  _id: 'sd12534',
  name: 'John Miles',
  email: 'john@miles.com',
  projects: [''],
};

export const resolvers: IResolvers = {
  Query: {
    test: () => DbService.test(),
  },
  Mutation: {
    signup: (source: any, { email }: { email: string }) => {
      console.log(email);
      return { ok: true, err: 'ee' };
    },
  },
};
