import { GraphQLServer } from 'graphql-yoga';
import { schema } from "./schema";
import { createContext as context } from "./context";
import { permissions } from "./permissions";

// porta do servidor
const port = 5001;

new GraphQLServer({
    schema,
    context,
    middlewares: [permissions]
}).start({ port },
    () => console.log(`🚀 Server ready at: http://localhost:${port} ✔`)
);