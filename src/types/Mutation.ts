import { objectType, intArg, stringArg } from "nexus";

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.createOneUser({ alias: 'singupUser' });
        t.crud.deleteOnePost();

        t.crud.deleteOneFollow({ alias: 'unFollow' });

        t.field('followin', {
            type: 'Follow',
            args: {
                currentUserId: intArg({ nullable: false }),
                userFollowin: intArg({ nullable: false })
            },

            resolve: (_, { currentUserId, userFollowin }, ctx) => {
                return ctx.prisma.follow.create({
                    data: {
                        current: {
                            connect: { id: currentUserId }
                        },
                        followId: userFollowin
                    }
                });
            }
        })

        t.field('creatPost', {
            type: 'Post',
            args: {
                title: stringArg({ nullable: false }),
                content: stringArg(),
                authorId: intArg(),
            },

            resolve: (_, { title, content, authorId }, ctx) => {
                return ctx.prisma.post.create({
                    data: {
                        title,
                        content,
                        author: {
                            connect: {
                                id: authorId
                            }
                        }
                    }
                });
            }
        });
    }
});