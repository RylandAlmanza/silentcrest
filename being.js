Silentcrest.being = function (spec) {
    var that = Silentcrest.thing(spec);
    Silentcrest.movement(that);
    Silentcrest.active(that);

    return that;
};
