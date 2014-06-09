Silentcrest.play = function () {
    var mapWidth = 30,
        mapHeight = 15, 
        map = [],
        beings = [];

    function drawTile(x, y) {
        var sprite = map[y][x].sprite;
        Silentcrest.display.set(x, y, {
            character: sprite.character,
            fg: sprite.fg,
            bg: sprite.bg
        });
    }

    function drawBeing(id) {
        var sprite = beings[id].sprite;
        Silentcrest.display.set(beings[id].x, beings[id].y, {
            character: sprite.character,
            fg: sprite.fg,
            bg: sprite.bg
        });
    }

    for (var j = 0; j < 15; j++) {
        map[j] = [];
        for (var i = 0; i < 30; i++) {
            map[j][i] = Silentcrest.tile(
                            i,
                            j,
                            Silentcrest.maps.test[(j * mapWidth) + i]
            );
            drawTile(i, j);
        }
    }

    beings[0] = Silentcrest.player({
        x: 1,
        y: 1
    });
    drawBeing(0);

    return function (e) {
        drawTile(beings[0].x, beings[0].y);
        beings[0].update(e);
        if (map[beings[0].y][beings[0].x].blocks) {
            beings[0].moveBack();
        }
        drawBeing(0);
        for (var i = 1; i < beings.length; i++) {
            drawTile(beings[i].x, beings[i].y);
            beings[i].update({});
            if (map[beings[i].y][beings[i].x].blocks) {
                beings[i].moveBack();
            }
            drawBeing(i);
        }
    };
};
