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

  type GenericResponse {
    ok: Boolean!
    err: String
  }

  type Query {
    getUserByEmail(email: String!): User
    getProjectById(projectId: String!): Project
    getAllUserProjects(userId: String!): [Project!]
  }

  type Mutation {
    signup(email: String!, name: String!): GenericResponse!
    newTask(taskName: String!, projectId: String!): GenericResponse!
    newProject(projectName: String!, userId: String!): GenericResponse!
    markTaskAsCompleted(projectId: String!, taskId: String!): GenericResponse!
    joinToExistingProject(shareCode: Int!, userId: String!): GenericResponse!
  }
`;
