import { ApolloError } from 'apollo-server';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { logger } from '../../../logger/logger';

export const handleErrorsPlugin: ApolloServerPlugin = {
  requestDidStart(error): GraphQLRequestListener {
    return {
      didEncounterErrors(error) {
        logger.error(error.errors);
        throw new ApolloError('There was an error');
      },
    };
  },
};
