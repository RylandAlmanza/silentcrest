window.onload = function () {
    Silentcrest.display = GenCon({
        defaultBg: BLACK,
        defaultFg: WHITE
    });
    Silentcrest.display.addTo('displayplace');

    Silentcrest.update = Silentcrest.startMenu();

    window.onkeypress = function (e) {
        Silentcrest.update(e);
    };
};
