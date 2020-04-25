import { verify } from "jsonwebtoken";
import { Context } from "../context";

export const SECRET = 'bolinho21'; // referencias kkjkjk

/**
 * Representado o conteudo do touken
 */
interface Token {
    userId: string
}

export const getUserId = (context: Context) => {

    // recuperando o auth na head da requisição
    const Authorization = context.request.get('Authorization');

    // verificando se existe bearer
    if (Authorization) {
        // pegando token
        const token = Authorization.replace('Bearer', '').trim();

        // verificando se o token bate com a SECRET
        const verifyToken = verify(token, SECRET) as Token;
        return verifyToken && verifyToken.userId;
    }

}