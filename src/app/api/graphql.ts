import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "../../graphQl/resolvers";
import typeDefs from "../../graphQl/schema";

const server = new ApolloServer({
     typeDefs,
     resolvers
});

export default startServerAndCreateNextHandler(server);
