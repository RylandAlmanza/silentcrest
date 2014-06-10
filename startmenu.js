Silentcrest.startMenu = function () {
    var options = [{
        text: 'Start',
        callback: function () {
            Silentcrest.update = Silentcrest.play();
        }
    }, {
        text: 'Credits',
        callback: function () {
            Silentcrest.update = Silentcrest.credits();
        }
    }, {
        text: 'Github',
        callback: function () {
            window.location = "https://github.com/RylandAlmanza/silentcrest";
        }
    }];
    var selection = 0;

    Silentcrest.display.clear();

    for (var i = 0; i < options.length; i++) {
        Silentcrest.display.putString(2, i, options[i].text);
    };

    Silentcrest.display.set(0, selection, {
        character: '>',
    });

    return function (e) {
        var key = String.fromCharCode(e.keyCode || e.which);
        if (key === 'j') {
            Silentcrest.display.set(0, selection, {
                character: ' '
            });
            selection++;
            if (selection >= options.length) {
                selection = 0;
            }
            Silentcrest.display.set(0, selection, {
                character: '>'
            });
        }
        if (key === 'k') {
            Silentcrest.display.set(0, selection, {
                character: ' '
            });
            selection--;
            if (selection < 0) {
                selection = options.length - 1;
            }
            Silentcrest.display.set(0, selection, {
                character: '>'
            });
        }
        if (key === 'x') {
            options[selection].callback();
        }
    };
};
