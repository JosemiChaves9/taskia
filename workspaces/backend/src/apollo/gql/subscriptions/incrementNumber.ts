import { PubSub } from 'apollo-server';

const pubsub = new PubSub();

export const publishSubscription = () => {
  return pubsub.asyncIterator(['INCREMENTED']);
};

let currentNumber = 0;
const incrementNumber = () => {
  currentNumber++;
  pubsub.publish('INCREMENTED', { incrementedNumber: currentNumber });
  setTimeout(incrementNumber, 500);
};

incrementNumber();
