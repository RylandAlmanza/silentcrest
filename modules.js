SilentCrest.position = function (thing) {
    thing.x = 0;
    thing.y = 0;
};

SilentCrest.movement = function (thing) {
    thing.moveBy = function (xDelta, yDelta) {
        this.x += xDelta;
        this.y += yDelta;
        return this;
    };
    thing.moveTo = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
};

SilentCrest.appearance = function (thing) {
    thing.sprite = SilentCrest.sprites.nothing;
    thing.setSprite = function (sprite) {
        thing.sprite = SilentCrest.sprites[sprite];
        return this;
    };
};

SilentCrest.active = function (thing) {
    thing.update = function (data) {};
};
