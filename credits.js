Silentcrest.credits = function () {
    Silentcrest.display.clear();
    Silentcrest.display.putString(2, 0, 'Programming by Ryland ' +
                                        'Taylor-Almanza.');
    Silentcrest.display.putString(2, 2, 'Art by whoever made your monospace ' +
                                        'font.');
    Silentcrest.display.putString(2, 4, '- Press any key to continue -');

    return function (e) {
        Silentcrest.update = Silentcrest.startMenu();
    };
};
