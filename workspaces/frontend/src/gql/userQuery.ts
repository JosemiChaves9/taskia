import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      _id
      name
      email
    }
  }
`;
