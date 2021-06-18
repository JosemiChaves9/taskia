import { gql } from '@apollo/client';

export const GET_PROJECT_BY_ID = gql`
  query getProjectById($projectId: String!) {
    getProjectById(projectId: $projectId) {
      _id
      name
      participants
      tasks {
        _id
        name
        completed
      }
      shareCode
    }
  }
`;
