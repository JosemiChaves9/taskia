import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      _id
      name
      email
    }
  }
`;
