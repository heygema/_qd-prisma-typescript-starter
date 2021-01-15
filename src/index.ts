import gql from "graphql-tag";
import prisma from "./prismaClient";
import { GraphQLServer } from "graphql-yoga";

const typeDefs = gql`
  type Query {
    hello(name: String): String!
    messages(roomId: String!): [String!]!
    friends: [String!]!
  }
`;

const resolvers = {
  Query: {
    hello: (_: any, { name }: any) => {
      return `hello ${name}`;
    },
    messages: () => {
      return prisma.message.findMany();
    },
    friends: () => {
      return [];
    }
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start(({ port }) => {
  console.log(`Server running on http://localhost${port}`);
});
