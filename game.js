window.onload = function () {
    SilentCrest.display = GenCon({
        defaultBg: BLACK,
        defaultFg: WHITE
    });
    SilentCrest.display.addTo('displayplace');

    SilentCrest.update = SilentCrest.startMenu();

    window.onkeypress = function (e) {
        SilentCrest.update(e);
    };
};
