import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation signup($email: String!, $name: String!) {
    signup(email: $email, name: $name) {
      ok
      err
      newUserId
    }
  }
`;
