import { gql } from '@apollo/client';

export const INCREMENT_NUMBER = gql`
  subscription incremented {
    incrementedNumber
  }
`;
