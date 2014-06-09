Silentcrest.thing = function (spec) {
    var that = {};
    Silentcrest.position(that);
    Silentcrest.appearance(that);

    that.x = spec.x || 0;
    that.y = spec.y || 0;
    that.setSprite(spec.sprite || 'nothing');

    return that;
};
