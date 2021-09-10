import { gql } from '@apollo/client';

export const CHANGE_TASK_STATE = gql`
  mutation changeTaskState(
    $projectId: String!
    $taskId: String!
    $taskCompleted: Boolean!
  ) {
    changeTaskState(
      projectId: $projectId
      taskId: $taskId
      taskCompleted: $taskCompleted
    ) {
      ok
      err
    }
  }
`;
