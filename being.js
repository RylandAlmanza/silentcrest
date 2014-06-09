SilentCrest.being = function (spec) {
    var that = thing(spec);
    SilentCrest.movement(that);
    SilentCrest.active(that);

    return that;
};

