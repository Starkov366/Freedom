// src/app/api/graphql/route.ts
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import resolvers from "@/graphQl/resolvers";
import typeDefs from "@/graphQl/schema";
import { NextRequest } from "next/server";

const server = new ApolloServer({ typeDefs, resolvers });
const handler = startServerAndCreateNextHandler(server, {
     context: async (req) => ({ req })
});

export async function POST(req: NextRequest) {
     return handler(req);
}

export async function GET(req: NextRequest) {
     return handler(req);
}
