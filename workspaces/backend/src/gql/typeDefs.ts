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
    completed: Boolean!
  }

  type Project {
    _id: ID!
    name: String!
    participants: [String!]
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
