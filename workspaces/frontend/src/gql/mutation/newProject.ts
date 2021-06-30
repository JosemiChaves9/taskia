import { gql } from '@apollo/client';

export const NEW_PROJECT = gql`
  mutation newProject($projectName: String!, $userId: String!) {
    newProject(projectName: $projectName, userId: $userId) {
      ok
      err
    }
  }
`;
