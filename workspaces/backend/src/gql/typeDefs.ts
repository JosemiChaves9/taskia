import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
  }

  type Task {
    name: String!
    completed: Boolean
  }

  type Project {
    _id: ID!
    name: String!
    participants: [ID!]
    tasks: [Task]
  }

  type GenericResponse {
    ok: Boolean!
    err: String
  }

  type Query {
    getUser(email: String!): User
    getProjectsById(userId: String!): [Project]
    getAllUserProjects(projectId: String!): Project!
    test: [Project]
  }

  type Mutation {
    signup(email: String!, name: String!): GenericResponse!
    newTask(name: String!, project: String!): GenericResponse!
    newProject(name: String!): GenericResponse!
  }
`;
