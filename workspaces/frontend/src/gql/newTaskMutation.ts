import { gql } from '@apollo/client';

export const NEW_TASK = gql`
  mutation newTask($projectId: String!, $taskName: String!) {
    newTask(projectId: $projectId, taskName: $taskName) {
      ok
      err
    }
  }
`;
