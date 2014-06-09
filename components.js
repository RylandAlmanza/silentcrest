Silentcrest.components = {};

Silentcrest.give = function (thing, component) {
    Silentcrest.components[component](thing);
};
