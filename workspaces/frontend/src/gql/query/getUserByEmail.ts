import { gql } from '@apollo/client';

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!, $password: String!) {
    getUserByEmail(email: $email, password: $password) {
      _id
      name
      email
    }
  }
`;
