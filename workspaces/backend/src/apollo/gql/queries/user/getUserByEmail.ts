import { requestWithTimeout } from '../../../../utils/timeout';
import { DbUser, GenericDbResponse } from '../../../../DbTypes';
import { DbServiceSingleton } from '../../../../services/DbServiceSingleton';
import { ApolloError, UserInputError } from 'apollo-server-errors';

export const getUserByEmail = (_source: any, { email }: { email: string }) => {
  return requestWithTimeout<DbUser>(
    5000,
    DbServiceSingleton.getInstance().getUserByEmail(email)
  );
};
