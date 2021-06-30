import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Task {
    _id: ID!
    name: String!
    completed: Boolean
  }

  type Project {
    _id: ID!
    name: String!
    participants: [ID]
    tasks: [Task]
    shareCode: Int!
  }

  type GenericMutationResponse {
    ok: Boolean!
    err: String
  }

  type Query {
    getUserByEmail(email: String!): User
    getProjectById(projectId: String!): Project
    getAllUserProjects(userId: String!): [Project!]
    test(email: String!): String
  }

  type Mutation {
    signup(email: String!, name: String!): GenericMutationResponse!
    newTask(taskName: String!, projectId: String!): GenericMutationResponse!
    newProject(projectName: String!, userId: String!): GenericMutationResponse!
    markTaskAsCompleted(
      projectId: String!
      taskId: String!
    ): GenericMutationResponse!
    joinToExistingProject(
      shareCode: Int!
      userId: String!
    ): GenericMutationResponse!
  }

  type Subscription {
    incrementedNumber: Int
  }
`;
