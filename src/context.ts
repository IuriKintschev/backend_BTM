import { PrismaClient } from "@prisma/client";
import { ContextParameters } from "graphql-yoga/dist/types";

/**
 * Contexto do prisma cliente
 *  sera passado para o servidor 
 */
const prisma = new PrismaClient();

// interface do contexto
export interface Context {
    prisma: PrismaClient
    request: {
        get(head: string): string 
    }
}

// exportando o contexto 
export const createContext = (request: ContextParameters) => ({
    ...request,
    prisma
});