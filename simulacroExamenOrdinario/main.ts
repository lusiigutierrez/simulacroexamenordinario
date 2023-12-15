import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import GraphQLError from "graphql"
import { Episode, Character } from "./types.ts";
import { Query } from "./query.ts";
import { typeDefs } from "./graphql.ts";
import getCharacter from "./getCharacter.ts";


const resolvers = {
  Query
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
