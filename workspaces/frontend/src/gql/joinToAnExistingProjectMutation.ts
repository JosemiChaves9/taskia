import { gql } from '@apollo/client';

export const JOIN_TO_AN_EXISTING_PROJECT = gql`
  mutation addToProject($shareCode: Int!, $userId: String!) {
    joinToExistingProject(shareCode: $shareCode, userId: $userId) {
      ok
      err
    }
  }
`;
