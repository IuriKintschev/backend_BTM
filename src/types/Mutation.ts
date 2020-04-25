import { objectType, intArg, stringArg } from "nexus";
import { compare, hash } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { SECRET, getUserId } from '../utils/JWT_decode'

export const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        // crud automatioc
        // deletando um post
        t.crud.deleteOnePost({ alias: 'deletePost' });
        // desincrevendo um usuario
        t.crud.deleteOneFollow({ alias: 'unFollow' });
        // crud automatioc END

        t.field('signupUser', {
            type: 'AuthType',
            description: 'Criando ususario, encryptando senha e retornando um JWT',

            // argumentos
            args: {
                name: stringArg({
                    nullable: false, description: 'O nome nao pode ser nullo'
                }),
                email: stringArg({
                    nullable: false, description: 'O email nao pode ser nullo'
                }),
                password: stringArg({
                    nullable: false, description: 'A senha nao pode ser nullo'
                })
            },

            resolve: async (_, { name, email, password }, ctx) => {

                // encryptando senha
                const encryptPass = await hash(password, 10);

                // criando usuario
                const user = await ctx.prisma.user.create({
                    data: {
                        name,
                        email,
                        password: encryptPass
                    }
                });


                /**
                 * Retornando um JWT criado 
                 *  e o proprio usuario
                 */
                return {
                    token: sign({ userId: user.id }, SECRET),
                    user,
                }
            }
        })

        t.field('login', {
            type: 'AuthType',
            description: 'Athenticação no sistema, funcao que devolve um JWT',

            // arguemtnos
            args: {
                email: stringArg({
                    nullable: false, description: 'O email nao pode ser nullo'
                }),
                password: stringArg({
                    nullable: false, description: 'A senha nao pode ser nullo'
                }),
            },

            resolve: async (_parent, { email, password }, ctx) => {

                // procurando user
                const user = await ctx.prisma.user.findOne({
                    where: {
                        email,
                    },
                })

                // validações
                if (!user) {
                    throw new Error(`Não possue usuario com esse: ${email}`);
                }

                const passwordValid = await compare(password, user.password);
                if (!passwordValid) {
                    throw new Error('Senha invalida');
                }

                /**
                * Retornando um JWT criado 
                *  e o proprio usuario
                */
                return {
                    token: sign({ userId: user.id }, SECRET),
                    user,
                }
            },
        })

        t.field('followin', {
            type: 'Follow',
            description: 'Função para seguir um usuario',

            // argumentos
            args: {
                userFollowin: intArg({ nullable: false, description: 'Id do ususario a ser seguido!' })
            },

            resolve: (_, { userFollowin }, ctx) => {
                // recuperando is usuario
                const userId = getUserId(ctx);

                // verificando
                if (!userId) throw new Error('Voce deve se autenticar antes!');

                return ctx.prisma.follow.create({
                    data: {
                        current: {
                            connect: { id: Number(userId) }
                        },
                        followId: userFollowin
                    }
                });
            }
        })

        t.field('creatPost', {
            type: 'Post',
            description: 'Criando um novo post',

            // aargumentos
            args: {
                title: stringArg({ nullable: false }),
                content: stringArg()
            },

            resolve: (_, { title, content }, ctx) => {
                // recuperando is usuario
                const userId = getUserId(ctx);

                // verificando
                if (!userId) throw new Error('Voce deve se autenticar antes!');

                return ctx.prisma.post.create({
                    data: {
                        title,
                        content,
                        author: {
                            connect: {
                                id: Number(userId)
                            }
                        }
                    }
                });
            }
        });
    }
});