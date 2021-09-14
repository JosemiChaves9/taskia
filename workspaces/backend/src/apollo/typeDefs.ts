import { gql } from 'apollo-server';

export const typeDefs = gql`
  type DbUser {
    _id: ID
    name: String
    email: String
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

  type GenericDbResponse {
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
    getUserById(userId: String): DbUser
    getProjectById(projectId: String!): DbProject
    getAllUserProjects(userId: String): [DbProject!]
  }

  type Mutation {
    signup(email: String!, name: String!): SignupMutationResponse!
    newTask(taskName: String!, projectId: String!): GenericDbResponse!
    newProject(projectName: String!, userId: String!): GenericDbResponse!
    changeTaskState(
      projectId: String!
      taskId: String!
      taskCompleted: Boolean!
    ): GenericDbResponse!
    joinToExistingProject(shareCode: Int!, userId: String!): GenericDbResponse!
    deleteProject(projectId: String!): GenericDbResponse!
    changeProjectName(
      projectId: String!
      newProjectName: String!
    ): GenericDbResponse!
  }

  type Subscription {
    changesInProject: Boolean
    changesInTask: Boolean
  }
`;
