import { gql } from '@apollo/client';

export const GET_PROJECTS_BY_EMAIL = gql`
  query getProjectsByEmail($email: String!) {
    getProjectsByEmail(email: $email) {
      _id
      name
      participants
      tasks {
        name
        completed
      }
    }
  }
`;
