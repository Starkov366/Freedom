import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "@/graphQl/resolvers";
import typeDefs from "@/graphQl/schema";

const server = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(server, {
     context: async (req) => ({ req })
});

export async function POST(req: Request) {
     return handler(req);
}

export async function GET(req: Request) {
     return handler(req);
}
