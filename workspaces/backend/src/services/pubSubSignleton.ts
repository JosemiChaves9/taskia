import { PubSub } from 'apollo-server';

let pubsub: PubSub | undefined;

export class PubSubSingleton {
  static getInstance() {
    if (pubsub) {
      return pubsub;
    } else {
      return (pubsub = createPubSub());
    }
  }
}

export const createPubSub = () => {
  return new PubSub();
};
