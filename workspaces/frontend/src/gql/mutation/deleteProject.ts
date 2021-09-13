import { gql } from '@apollo/client';

export const DELETE_PROJECT = gql`
  mutation deleteProject($projectId: String!) {
    deleteProject(projectId: $projectId) {
      ok
      err
    }
  }
`;
