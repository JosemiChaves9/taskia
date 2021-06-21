require('dotenv').config();

import { ApolloServer } from 'apollo-server';
import { typeDefs } from './gql/typeDefs';
import { resolvers } from './gql/resolvers';
import { DbService } from './services/DbService';

// TODO: implement logging

// TODO: try to avoid callback hell
// TODO: Try to move all apollo related classes etc into another modoule

// TODO: GQL: better organization of your gql modules
// TODO: remove all async/await and use normal promises
//TODO: check GenericResponse naming

DbService.connect().then(() => {
  const server = new ApolloServer({ typeDefs, resolvers });
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
});
