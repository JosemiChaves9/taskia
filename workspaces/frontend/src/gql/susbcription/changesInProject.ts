import { gql } from '@apollo/client';

export const CHANGES_IN_PROJECT = gql`
  subscription changesInProject {
    changesInProject
  }
`;
