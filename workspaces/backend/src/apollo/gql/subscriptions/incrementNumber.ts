import { pubsub } from '../../resolvers';

let currentNumber = 0;
const incrementNumber = () => {
  currentNumber++;
  // pubsub.publish('INCREMENTED', { incrementedNumber: currentNumber });
  // setTimeout(incrementNumber, 500);
};

incrementNumber();
