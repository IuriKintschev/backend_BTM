import { GraphQLServer } from 'graphql-yoga';

const port = 4000;

const typeDefs = `
  type Query {
    hello(name: String): String!
  }
`
interface Hello {
    name?: String
}

const resolvers = {
    Query: {
        hello: (_: any, { name }: Hello) => `Hello ${name || 'World'}`,
    },
}

new GraphQLServer({
    typeDefs,
    resolvers
}).start({ port },
    () => console.log(`🚀 Server ready at: http://localhost:${port} ⭐️`)
);