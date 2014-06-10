// The GenCon function returns a GenCon display. It takes a Javascript object
// that can have the following properties
//
// width:
//     The width of the display in characters. If not provided, width defaults
//     to 80
//
// height:
//     The height of the display in characters. If not provided, height defaults
//     to 24
//
// defaultFg:
//     The default css foreground of the display. If not provided, defaultFg
//     defaults to 'white'
//
// defaultBg:
//     The default css background of the display. If not provided, defaultBg
//     defaults to 'black'
//
// font:
//     The css font to be used for the display. If not provided, font defaults
//     'monospace'
//
// - Example -
//     var display = GenCon({width: 25, height: 20, defaultBg: '#ff0000'});

var GenCon = function (spec) {
    var that = {},
        container = document.createElement('span');
    
    spec.width = spec.width || 80;
    spec.height = spec.height || 24;
    spec.defaultFg = spec.defaultFg || 'white';
    spec.defaultBg = spec.defaultBg || 'black';
    spec.font = spec.font || 'monospace';

    (function () {
        var span;
        for (var y = 0; y < spec.height; y++) {
            for (var x = 0; x < spec.width; x++) {
                span = document.createElement('span');
                span.id = 'cell-' + x + '-' + y;
                span.appendChild(document.createTextNode('\u00a0'));
                span.style.background = spec.defaultBg;
                span.style.color = spec.defaultFg;
                container.appendChild(span);
            }
            container.appendChild(document.createElement('br'));
        }
    })();

    // The addTo method adds the display to a DOM element. It takes the
    // following parameter
    //
    // elementId:
    //     The id of the element you would like to add the display to.
    //
    // - Example -
    //     <div id="displayplace"></div>
    //     <script>
    //         var display = GenCon({});
    //         display.addTo('displayplace');
    //     </script>

    that.addTo = function (elementId) {
        document.getElementById(elementId).style.fontFamily = spec.font;
        document.getElementById(elementId).appendChild(container);
        return this;
    };

    // The putChar method draws a character to the display. It takes the
    // following parameters.
    //
    // character:
    //     The character to draw
    //
    // x:
    //     The horizontal coordinate of the character
    //
    // y:
    //     The vertical coordinate of the character
    //
    // (optional) fg:
    //     The css foreground of the character. If not provided, the display's
    //     defaultFg is used
    //
    // (optional) bg:
    //     The css background of the character. If not provided, the display's
    //     defaultBg is used
    //
    // - Example -
    //     var display = GenCon({});
    //     display.putChar('@', 2, 5);
    //     display.putChar('D', 3, 5, 'red'); 

    that.putChar = function (x, y, character) {
        var fg = arguments.length > 3 ? arguments[3] : spec.defaultFg,
            bg = arguments.length > 4 ? arguments[4] : spec.defaultBg;
        var span = document.getElementById('cell-' + x + '-' + y);
        span.childNodes[0].nodeValue = character === ' ' ? '\u00a0' : character;
        span.style.color = fg;
        span.style.background = bg;
        return this;
    };

    // The set method allows you to set any values of a cell, without altering
    // the values you don't provide. It takes the following parameters
    //
    // x:
    //     The horizontal position of the cell
    //
    // y:
    //     The vertical position of the cell
    //
    // settings:
    //     A javascript object that has the properties you'd like to modify.
    //     Any properties not provided will be left as they already are. The
    //     following properties may be used.
    //
    //     character:
    //         The character to put in the cell
    //
    //     fg:
    //         The css forground of the cell
    //
    //     bg:
    //         The css background of the cell
    //
    // - Example -
    //    var display = GenCon({});
    //    display.putChar('a', 3, 2, 'green', 'yellow');
    //    display.set(3, 2, {
    //        bg: 'blue'
    //    });

    that.set = function (x, y, settings) {
        var span = document.getElementById('cell-' + x + '-' + y);
        span.style.background = settings.bg || span.style.background;
        span.style.color = settings.fg || span.style.color;
        if (settings.character) {
            settings.character = settings.character === ' ' ? '\u00a0' :
                                 settings.character;
        }
        span.childNodes[0].nodeValue = settings.character;
        return this;
    };

    // The putString method draws a sequence of characters to the display. It
    // takes the following parameters.
    //
    // string:
    //     The sequence of characters to draw
    //
    // x:
    //     The horizontal coordinate to start placing the characters from
    //
    // y:
    //     The vertical coordinate to start placing the characters from
    //
    // (optional) fg:
    //     The css foreground of the character. If not provided, the display's
    //     defaultFg is used
    //
    // (optional) bg:
    //     The css background of the character. If not provided, the display's
    //     defaultBg is used
    //
    // (optional) maxWidth:
    //     The width of the theoretical text-box. If this is not provided, the
    //     string will be drawn all in one row. If this is provided, the string
    //     will be cut off when it reaches x + maxWidth, and it will resume
    //     drawing the string on the next row.
    //
    // (optional) formatting:
    //     By default, if the text reaches maxWidth, it will cut off a word, and
    //     start it again in the next row. If you set formatting to true, it
    //     will attempt to not cut off words by going to the next row if it
    //     detects the next word would otherwise get cut off
    //
    // - Example -
    //     var display = GenCon({});
    //     display.putString('Heyo!', 2, 5);
    //     display.putString('This text is longer and formatted',
    //                       4,
    //                       5,
    //                       'red',
    //                       'black',
    //                       10,
    //                       true);

    that.putString = function (x, y, string) {
        var fg = arguments.length > 3 ? arguments[3] : spec.defaultFg,
            bg = arguments.length > 4 ? arguments[4] : spec.defaultBg,
            maxWidth = arguments.length > 5 ? arguments[5] : 0,
            formatting = arguments.length > 6 ? arguments[6] : false,
            xOffset = 0,
            words = string.split(' ');
        if (formatting) {
            for (var i = 0; i < words.length; i++) {
                if (maxWidth > 0 && xOffset + words[i].length + 1 > maxWidth) {
                    xOffset = 0;
                    y++;
                }
                if (i > 0 && xOffset !== 0) {
                    this.putChar(x + xOffset, y, ' ', fg, bg);
                    xOffset++;
                }
                for (var j = 0; j < words[i].length; j++) {
                    this.putChar(x + xOffset, y, words[i].charAt(j), fg, bg);
                    xOffset++;
                }
            }
        } else {
            for (var i = 0; i < string.length; i++) {
                if (maxWidth > 0 && xOffset === maxWidth) {
                    xOffset = 0;
                    y++;
                }
                this.putChar(x + xOffset, y, string.charAt(i), fg, bg);
                xOffset++;
            }
        }
        return this;
    };

    // The getWidth method returns the width of the display in characters

    that.getWidth = function () {
        return spec.width;
    };

    // The getHeight method returns the height of the display in characters

    that.getHeight = function () {
        return spec.height;
    };

    // The getVisualWidth method returns the width of the console in pixels

    that.getVisualWidth = function () {
        return container.offsetWidth;
    };

    // The getVisualHeight method returns the height of the console in pixels

    that.getVisualHeight = function () {
        return container.offsetHeight;
    };

    // The getDisplayCoord method returns the x and y coordinates of the cell
    // that is under the given pixel coordinates. It takes the following
    // parameters.
    //
    // x:
    //     The horizontal pixel coordinate to convert. For example, the x
    //     position of the mouse cursor
    //
    // y:
    //     The vertical pixel coordinate to convert. For example, the y position
    //     of the mouse cursor
    //
    // - Example -
    //     var display = GenCon({});
    //     display.getDisplayCoord(32, 28);

    that.getDisplayCoord = function (x, y) {
        var element = container,
            firstCell = document.getElementById('cell-0-0'),
            characterWidth = firstCell.offsetWidth,
            characterHeight = firstCell.offsetHeight;

        // This little piece of code loops up through all the parent elements
        // to find the absolute pixel coordinate of the display. Pulled from
        // stack overflow. http://stackoverflow.com/questions/288699
        for (var containerX = 0, containerY = 0;
             element != null;
             containerX += element.offsetLeft,
             containerY += element.offsetTop,
             element = element.offsetParent);

        return {
            x: Math.floor((x - containerX) / characterWidth),
            y: Math.floor((y - containerY) / characterHeight)
        };
    };

    // The clear method blanks out the entire screen if no parameters are
    // supplied. If parameter's are supplied, it expects them to be the
    // following.
    //
    // startX:
    //     The left-most horizontal coordinate of the area to clear
    //
    // startY:
    //     The top-most vertical coordinate of the area to clear
    //
    // width:
    //     The width of the area to clear
    //
    // height:
    //     The height of the area to clear
    //
    // - Example -
    //     var display = GenCon({});
    //     display.clear();
    //     display.clear(2, 2, 3, 4);

    that.clear = function () {
        var startX = 0,
            startY = 0,
            clearWidth = spec.width,
            clearHeight = spec.height;
    
        if (arguments.length > 0) {
            startX = arguments[0];
            startY = arguments[1];
            clearWidth = arguments[2];
            clearHeight = arguments[3];
        }

        for (var j = startY; j < clearHeight; j++) {
            for (var i = startX; i < clearWidth; i++) {
                this.set(i, j, {
                    character: ' ',
                    fg: spec.defaultFg,
                    bg: spec.defaultBg
                });
            }
        }

        return this;
    };

    return that;
};
