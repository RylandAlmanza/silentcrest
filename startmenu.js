SilentCrest.startMenu = function () {
    var options = ['Start', 'Credits', 'Github'];
    var selection = 0;

    for (var i = 0; i < options.length; i++) {
        SilentCrest.display.putString(2, i, options[i]);
    };

    SilentCrest.display.set(0, selection, {
        character: '>',
    });

    return function (e) {
        var key = String.fromCharCode(e.keyCode || e.which);
        if (key === 'j') {
            SilentCrest.display.set(0, selection, {
                character: ' '
            });
            selection++;
            if (selection >= options.length) {
                selection = 0;
            }
            SilentCrest.display.set(0, selection, {
                character: '>'
            });
        }
        if (key === 'k') {
            SilentCrest.display.set(0, selection, {
                character: ' '
            });
            selection--;
            if (selection < 0) {
                selection = options.length - 1;
            }
            SilentCrest.display.set(0, selection, {
                character: '>'
            });
        }
    };
};
