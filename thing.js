Silentcrest.thing = function (spec) {
    var that = {};
    Silentcrest.position(that);
    Silentcrest.sprite(that);

    that.x = spec.x || 0;
    that.y = spec.y || 0;
    that.sprite = spec.sprite || 'nothing';

    return that;
};
