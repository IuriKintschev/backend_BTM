import { rule, shield } from "graphql-shield";
import { getUserId } from "../utils/JWT_decode";
import { Context } from "../context";

interface WherePrismaARG {
    where: {
        id: Number
    }
}

const rules = {
    /**
     * Regra verificando se é o current
     *  user a aefetuar tal ação
     */
    isAuthenticateUser: rule()((_, _args, ctx: Context) => {

        const userId = getUserId(ctx);
        return !!userId;
    }),

    /**
     * Regra verificando se é o current
     *  user a realizar qualquer ação relacionado 
     *  a posts do proprio usuario
     */
    isPostOwner: rule()(async (_, { where }: WherePrismaARG, ctx: Context) => {

        const userId = getUserId(ctx);
        const author = await ctx.prisma.post
            .findOne({
                where: {
                    id: Number(where.id),
                }
            })
            .author();

        return userId === author?.id;
    })
}

export const permissions = shield({
    Query: {
        post: rules.isAuthenticateUser
    },
    Mutation: {
        followin: rules.isAuthenticateUser,
        unFollow: rules.isAuthenticateUser,
        deletePost: rules.isPostOwner,
        creatPost: rules.isAuthenticateUser
    }
});