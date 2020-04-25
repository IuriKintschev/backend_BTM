import { objectType, intArg, stringArg } from "nexus";

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
            args: {
                currentUserId: intArg({ nullable: false })
            },

            resolve: (_, { currentUserId }, ctx) => {
                return ctx.prisma.raw`
              SELECT
                  us.*
              FROM
                  Follow AS fl
              INNER JOIN User us ON (us.id = fl.followId)
              WHERE
                  fl.id = ${currentUserId}
          `;
            }
        });

        t.list.field('filterPosts', {
            type: 'Post',
            args: {
                searchString: stringArg({ nullable: true }),
            },
            resolve: (_, { searchString }, ctx) => {
                return ctx.prisma.post.findMany({
                    where: {
                        OR: [
                            {
                                title: {
                                    contains: searchString,
                                },
                            },
                            {
                                content: {
                                    contains: searchString,
                                },
                            },
                        ],
                    },
                })
            },
        })

        t.list.field('Feed', {
            type: 'Post',
            description: 'Recuperando os posts que foram publicados',
            args: {
                currentUserId: intArg({ nullable: false })
            },

            resolve: (_, { currentUserId }, ctx) => {
                return ctx.prisma.raw`
              SELECT
                  ps.*
              FROM
                  User us
              left join Follow fl ON (fl.currentId = us.id)
              INNER JOIN Post ps ON (ps.authorId = us.id OR ps.authorId = fl.followId)
              WHERE
                  us.id = ${currentUserId}
          `;
            }
        });

        t.list.field('FeedProfile', {
            type: 'Post',
            description: 'Recuperando os meus posts para ser ezibidos no profile',
            args: {
                currentUserId: intArg({ nullable: false })
            },

            resolve: (_, { currentUserId }, ctx) => {
                return ctx.prisma.post.findMany({
                    where: {
                        author: {
                            id: currentUserId
                        }
                    }
                });
            }
        });

        t.list.field('filterPosts', {
            type: 'Post',
            description: 'Procurando posts por label ou content',
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