import { objectType, intArg, stringArg } from "nexus";
import { getUserId } from "../utils/JWT_decode";

export const Query = objectType({
    name: 'Query',
    description: 'Consultas a API',

    definition(t) {
        t.crud.post();
        t.crud.user();
        t.crud.users();

        t.list.field('Followers', {
            type: 'User',
            description: 'Trazendo todos os follows de um usuario',

            resolve: (_, _args, ctx) => {
                // recuperando is usuario
                const userId = getUserId(ctx);

                // verificando
                if (!userId) throw new Error('Voce deve se autenticar antes!');

                return ctx.prisma.raw`
                    SELECT
                        us.*
                    FROM
                        Follow AS fl
                    INNER JOIN User us ON (us.id = fl.followId)
                    WHERE
                        fl.id = ${Number(userId)}
                `;
            }
        });

        t.list.field('Feed', {
            type: 'Post',
            description: 'Recuperando os posts que foram publicados',

            resolve: (_, _args, ctx) => {
                // recuperando is usuario
                const userId = getUserId(ctx);

                // verificando
                if (!userId) throw new Error('Voce deve se autenticar antes!');

                return ctx.prisma.raw`
                    SELECT
                        ps.*
                    FROM
                        User us
                    left join Follow fl ON (fl.currentId = us.id)
                    INNER JOIN Post ps ON (ps.authorId = us.id OR ps.authorId = fl.followId)
                    WHERE
                        us.id = ${Number(userId)}
                `;
            }
        });

        t.list.field('FeedProfile', {
            type: 'Post',
            description: 'Recuperando os meus posts para ser ezibidos no profile',

            resolve: (_, _args, ctx) => {
                // recuperando is usuario
                const userId = getUserId(ctx);

                // verificando
                if (!userId) throw new Error('Voce deve se autenticar antes!');

                return ctx.prisma.post.findMany({
                    where: {
                        author: {
                            id: Number(userId)
                        }
                    }
                });
            }
        });

        t.list.field('filterPosts', {
            type: 'Post',
            description: 'Procurando posts por titulo ou conteudo',
            args: {
                searchPost: stringArg({ nullable: true })
            },

            resolve: (_, { searchPost }, ctx) => {
                return ctx.prisma.post.findMany({
                    where: {
                        OR: [
                            { title: { contains: searchPost } },
                            { content: { contains: searchPost } }
                        ]
                    }
                })
            }
        })
    }
});