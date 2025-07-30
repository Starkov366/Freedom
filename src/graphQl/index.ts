import typeDefs from "./schema.ts";
import resolvers from "./resolvers.ts";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
const server = new ApolloServer({
     typeDefs,
     resolvers
});

const { url } = await startStandaloneServer(server, {
     listen: { port: 4000 }
});

console.log(`🚀  Server ready at: ${url}`);
