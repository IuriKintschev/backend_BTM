import { objectType } from "nexus";

export const Follow = objectType({
    name: 'Follow',
    description: 'Forma de efetuar um foolow em outro usuario',

    definition(t) {
        t.model.id();
        t.model.followId();
        t.model.current();
    }
});
