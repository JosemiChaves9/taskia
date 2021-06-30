import { PubSubSingleton } from '../../../services/pubSubSignleton';

export const publishChangesInProject = () => {
  PubSubSingleton.getInstance().publish('CHANGES_IN_PROJECT', {
    changesInProjects: 'stee',
  });
};
