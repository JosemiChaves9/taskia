import { gql } from '@apollo/client';

export const CHANGES_IN_TASK = gql`
  subscription changesInTask {
    changesInTask
  }
`;
