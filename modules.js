Silentcrest.position = function (thing) {
    thing.x = 0;
    thing.y = 0;
};

Silentcrest.movement = function (thing) {
    thing.facing = Silentcrest.north;
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
    thing.move = function (direction) {
        var delta = Silentcrest.deltas[direction];
        this.facing = direction;
        this.moveBy(delta.x, delta.y);
    };
    thing.moveBack = function () {
        var delta;
        this.facing = Silentcrest.reverseDirection(this.facing);
        delta = Silentcrest.deltas[this.facing];
        thing.moveBy(delta.x, delta.y);
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

Silentcrest.blocking = function (thing) {
    thing.blocks = false;
};
