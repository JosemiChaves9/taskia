import { gql } from '@apollo/client';

export const CHANGE_PROJECT_NAME = gql`
  mutation changeProjectName($projectId: String!, $newProjectName: String!) {
    changeProjectName(projectId: $projectId, newProjectName: $newProjectName) {
      ok
      err
    }
  }
`;
