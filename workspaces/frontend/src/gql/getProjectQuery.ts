import { gql } from '@apollo/client';

export const GET_PROJECT = gql`
  query getProject($projectId: String!) {
    getProject(projectId: $projectId) {
      _id
      name
      participants
      tasks {
        completed
        name
      }
    }
  }
`;
