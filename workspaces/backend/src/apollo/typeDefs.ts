import { gql } from 'apollo-server';

export const typeDefs = gql`
  type DbUser {
    _id: ID!
    name: String!
    email: String!
  }

  type DbTask {
    _id: ID!
    name: String!
    completed: Boolean
  }

  type DbProject {
    _id: ID!
    name: String!
    participants: [ID]
    tasks: [DbTask]
    shareCode: Int!
  }

  type GenericMutationResponse {
    ok: Boolean!
    err: String
  }
  type SignupMutationResponse {
    ok: Boolean!
    err: String
    newUserId: String
  }

  type Query {
    getUserByEmail(email: String!): DbUser
    getUserById(userId: String!): DbUser
    getProjectById(projectId: String!): DbProject
    getAllUserProjects(userId: String!): [DbProject!]
  }

  type Mutation {
    signup(email: String!, name: String!): SignupMutationResponse!
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
    changesInProject: Boolean
    changesInTask: Boolean
  }
`;
