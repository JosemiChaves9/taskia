import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById($userId: String) {
    getUserById(userId: $userId) {
      _id
      name
      email
    }
  }
`;
