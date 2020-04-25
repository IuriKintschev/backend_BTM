import { objectType } from "nexus";

export const Post = objectType({
    name: 'Post',
    description: 'Posts dos usuarios',

    definition(t) {
        t.model.id();
        t.model.title();
        t.model.content();
        t.model.author();
        t.model.createdAt();
    }
});