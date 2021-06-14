import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    projects: [ID]
  }

  type Task {
    _id: ID!
    name: String!
  }

  type Project {
    _id: ID!
    name: String!
    tasks: [Task]
  }

  type GenericResponse {
    ok: Boolean!
    err: String
  }

  type Query {
    getUser(email: String!): User
    project: Project
    projects: [Project]
  }

  type Mutation {
    signup(email: String!, name: String!): GenericResponse!
    newTask(name: String!): GenericResponse!
    newProject(name: String!): GenericResponse!
  }
`;
