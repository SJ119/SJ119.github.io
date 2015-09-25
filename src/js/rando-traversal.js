var N = 1 << 0,
    S = 1 << 1,
    W = 1 << 2,
    E = 1 << 3;

self.addEventListener("message", function(event) {
    postMessage(genMaze(event.data.width, event.data.height));
});

function genMaze(mazeWidth, mazeHeight) {
    var maze = new Array(mazeWidth * mazeHeight),
        options = [],
        startIdx = mazeWidth / 2 | 0;
        secondIdx = (mazeHeight - 1) * mazeWidth;
        thirdIdx = mazeHeight * mazeWidth - 1;

    options.push({
        index: startIdx,
        direction: W
    });
    options.push({
        index: startIdx,
        direction: S
    });
    options.push({
        index: startIdx,
        direction: E
    });

    options.push({
        index: secondIdx,
        direction: N
    });
    options.push({
        index: secondIdx,
        direction: E
    });

    options.push({
        index: thirdIdx,
        direction: N
    });
    options.push({
        index: thirdIdx,
        direction: W
    });

    while ((selected = popRandom(options)) != null) {
        var selected,
            index = selected.index,
            direction = selected.direction,
            newIndex = index + (direction === N ? -mazeWidth : direction === S ? mazeWidth : direction === W ? -1 : +1),
            x = index % mazeWidth,
            y = index / mazeWidth | 0,
            newX,
            newY,
            newDirection,
            open = maze[newIndex] == null;

        if (direction === N) {
            newX = x;
            newY = y - 1;
            newDirection = S;
        } else if (direction === S) {
            newX = x;
            newY = y + 1;
            newDirection = N;
        } else if (direction === W) {
            newX = x - 1;
            newY = y;
            newDirection = E;
        } else if (direction === E) {
            newX = x + 1;
            newY = y;
            newDirection = W;
        }

        if (open) {
            maze[index] |= direction, maze[newIndex] |= newDirection;
            if (newY > 0 && maze[newIndex - mazeWidth] == null) {
                options.push({
                    index: newIndex,
                    direction: N
                });
            }
            if (newY < mazeHeight - 1 && maze[newIndex + mazeWidth] == null) {
                options.push({
                    index: newIndex,
                    direction: S
                });
            }
            if (newX > 0 && maze[newIndex - 1] == null) {
                options.push({
                    index: newIndex,
                    direction: W
                });
            }
            if (newX < mazeWidth - 1 && maze[newIndex + 1] == null) {
                options.push({
                    index: newIndex,
                    direction: E
                });
            }
        }

    }
    
    return maze;
};

function popRandom(arr) {
    if (!arr.length) return;
    var len = arr.length,
        selected = Math.random() * len | 0,
        temp;
    temp = arr[selected];
    arr[selected] = arr[len - 1];
    arr[len - 1] = temp;
    return arr.pop();
}
