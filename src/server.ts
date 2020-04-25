import { GraphQLServer } from 'graphql-yoga';
import { schema } from "./schema";
import { createContext as context } from "./context";

// porta do servidor
const port = 5001;

new GraphQLServer({
    // @ts-ignore
    schema,
    context
}).start({ port },
    () => console.log(`🚀 Server ready at: http://localhost:${port}`)
);