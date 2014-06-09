Silentcrest.position = function (thing) {
    thing.x = 0;
    thing.y = 0;
};

Silentcrest.movement = function (thing) {
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

Silentcrest.appearance = function (thing) {
    thing.sprite = Silentcrest.sprites.nothing;
    thing.setSprite = function (sprite) {
        thing.sprite = Silentcrest.sprites[sprite];
        return this;
    };
};

Silentcrest.active = function (thing) {
    thing.update = function (data) {};
};
