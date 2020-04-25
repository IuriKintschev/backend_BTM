import { objectType } from "nexus";

export const AuthPayload = objectType({
    name: 'AuthType',
    description: 'Payload de autenticação',

    definition(t) {
        t.string('token');
        t.field('user', { type: 'User' });
    }
});