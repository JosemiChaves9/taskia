import { PubSubSingleton } from '../../../services/pubSubSignleton';

export const publishChangesInProject = () => {
  return PubSubSingleton.getInstance().publish('CHANGES_IN_PROJECT', {
    changesInProject: true,
  });
};
