import { gql } from '@apollo/client';

export const MARK_TASK_AS_COMPLETED = gql`
  mutation markTaskAsCompleted($projectId: String!, $taskId: String!) {
    markTaskAsCompleted(projectId: $projectId, taskId: $taskId) {
      ok
      err
    }
  }
`;
