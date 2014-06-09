Silentcrest.player = function (spec) {
    var that = Silentcrest.being({
        x: spec.x || 0,
        y: spec.y || 0,
        sprite: spec.sprite || 'player'
    });

    that.update = function (e) {
        var key = String.fromCharCode(e.keyCode || e.which);
        if (key === 'k') {
            this.move(Silentcrest.north);
        }
        if (key === 'l') {
            this.move(Silentcrest.east);
        }
        if (key === 'j') {
            this.move(Silentcrest.south);
        }
        if (key === 'h') {
            this.move(Silentcrest.west);
        }
    };

    return that;
};
