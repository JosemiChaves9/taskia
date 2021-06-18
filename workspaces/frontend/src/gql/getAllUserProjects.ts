import { gql } from '@apollo/client';

export const GET_ALL_USER_PROJECTS = gql`
  query getAllUserProjects($userId: String!) {
    getAllUserProjects(userId: $userId) {
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
