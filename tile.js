Silentcrest.tile = function (x, y, character) {
    var that,
        sprite,
        blocks;

    if (character === 'T') {
        sprite = 'tree';
        blocks = true;
    } else if (character === '.') {
        sprite = 'grass';
        blocks = false;
    }

    that = Silentcrest.thing({
        x: x,
        y: y,
        sprite: sprite
    });
    Silentcrest.blocking(that);

    that.blocks = blocks;

    return that;
};
