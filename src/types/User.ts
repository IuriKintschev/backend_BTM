import { objectType } from "nexus";

export const User = objectType({
    name: 'User',
    description: 'Usuario que possue os posts',

    definition(t) {
        t.model.id();
        t.model.name();
        t.model.email();
        t.model.posts(
            {
                pagination: false
            }
        );
        t.model.follows(
            {
                pagination: false
            }
        );
    }
});
