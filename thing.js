SilentCrest.thing = function (spec) {
    var that = {};
    SilentCrest.position(that);
    SilentCrest.sprite(that);

    that.x = spec.x || 0;
    that.y = spec.y || 0;
    that.sprite = spec.sprite || 'nothing';

    return that;
};
