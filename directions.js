Silentcrest.north = 0;
Silentcrest.east = 1;
Silentcrest.south = 2;
Silentcrest.west = 3;

Silentcrest.deltas = [
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: 0, y: 1},
    {x: -1, y: 0}
];

Silentcrest.reverseDirection = function (direction) {
    if (direction === Silentcrest.north) {
        return Silentcrest.south;
    } else if (direction === Silentcrest.east) {
        return Silentcrest.west;
    } else if (direction === Silentcrest.south) {
        return Silentcrest.north;
    } else if (direction === Silentcrest.west) {
        return Silentcrest.east;
    }
};
