import { logger } from '../../logger/logger';
import { GraphQLRequestContext } from 'apollo-server-plugin-base';

export const debugPlugin = {
  requestDidStart(context: GraphQLRequestContext) {
    logger.debug(JSON.stringify(context.request.variables));
  },
};
