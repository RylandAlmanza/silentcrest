Silentcrest.being = function (spec) {
    var that = thing(spec);
    Silentcrest.movement(that);
    Silentcrest.active(that);

    return that;
};

