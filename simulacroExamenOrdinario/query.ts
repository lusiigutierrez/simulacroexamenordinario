import getCharacter from "./getCharacter.ts";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { typeDefs } from "./graphql.ts";

export const Query = { 
    character:async (_parent: unknown, args: {id: string }) => {
      try {
        return await getCharacter(args.id);
      } catch (error) {
        throw new Error(`No se encuentra al personaje con ese id`);
      }
    },
    charactersByIds:async (_parent: unknown, args: { ids: string[] }) => {
      try {
        const charactersPromises = args.ids.map((id) => getCharacter(id));
        return await Promise.all(charactersPromises);
      } catch (error) {
        throw new Error(`Error obteniendo los personajes: ${error.message}`);
      }
    },
}



