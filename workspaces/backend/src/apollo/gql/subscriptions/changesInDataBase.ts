import { pubsub } from '../../resolvers';

export const publishChangesinBBDD = () => {
  return pubsub.asyncIterator('CHANGES_IN_BBDD');
};
