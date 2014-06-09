SilentCrest.components = {};

SilentCrest.give = function (thing, component) {
    SilentCrest.components[component](thing);
};
