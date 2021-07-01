import { PubSubSingleton } from '../../../services/pubSubSignleton';

export const publishChangesInTask = () => {
  return PubSubSingleton.getInstance().publish('CHANGES_IN_TASK', {
    changesInTask: true,
  });
};
