"use strict";
var Lake = /** @class */ (function () {
    function Lake(surface, volume) {
        this.surface = surface;
        this.volume = volume;
    }
    return Lake;
}());
function countLakes(input, board) {
    var lakes = [];
    var tempIndex = 0;
    var tempHeight = input[0];
    var tempSurface = 0;
    var tempVolume = 0;
    // find the max height and its index in the input array
    var maxHeight = 0;
    var maxIndex = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] > maxHeight) {
            maxHeight = input[i];
            maxIndex = i;
        }
    }
    //find lakes in the left part
    for (var i = 1; i <= maxIndex; i++) {
        if (input[i] < tempHeight) {
            tempVolume += tempHeight - input[i];
            tempSurface = i - tempIndex;
        }
        else {
            tempIndex = i;
            var helper = tempHeight;
            tempHeight = input[i];
            if (tempSurface > 0) {
                var currentLake = new Lake(tempSurface, tempVolume);
                lakes.push(currentLake);
                for (var row = maxHeight - helper; row < maxHeight; row++) {
                    for (var col = i - 1; col > i - 1 - tempSurface; col--) {
                        if (board[row][col] != '|') {
                            board[row][col] = 'x';
                        }
                    }
                }
                tempVolume = 0;
                tempSurface = 0;
            }
        }
    }
    // find lakes in the right part
    for (var i = input.length - 1, tempHeight_1 = input[i], tempIndex_1 = i, tempSurface_1 = 0, tempVolume_1 = 0; i >= maxIndex; i--) {
        if (input[i] < tempHeight_1) {
            tempVolume_1 += tempHeight_1 - input[i];
            tempSurface_1 = tempIndex_1 - i;
        }
        else {
            tempIndex_1 = i;
            var helper = tempHeight_1;
            tempHeight_1 = input[i];
            if (tempSurface_1 > 0) {
                var currentLake = new Lake(tempSurface_1, tempVolume_1);
                lakes.push(currentLake);
                for (var row = maxHeight - helper; row < maxHeight; row++) {
                    for (var col = i + 1; col < i + 1 + tempSurface_1; col++) {
                        if (board[row][col] != '|') {
                            board[row][col] = 'x';
                        }
                    }
                }
                tempVolume_1 = 0;
                tempSurface_1 = 0;
            }
        }
    }
    return lakes;
}
//convert the input to a board
function drawBoard(input) {
    var max = input[0];
    var maxIndex = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] > max) {
            max = input[i];
            maxIndex = i;
        }
    }
    var board = [];
    for (var i = 0; i < max; i++) {
        board[i] = [];
        for (var j = 0; j < input.length; j++) {
            if (input[j] + i >= max) {
                board[i][j] = "|";
            }
            else {
                board[i][j] = " ";
            }
        }
    }
    return board;
}
function printBoard(board) {
    if (board.length < 1 || board[0].length < 1) {
        return;
    }
    var m = board.length;
    var n = board[0].length;
    for (var i = 0; i < m; i++) {
        var s = "";
        for (var j = 0; j < n; j++) {
            s += board[i][j];
        }
        console.log(s);
    }
}
function printLakes(lakes) {
    if (lakes.length == 0) {
        console.log("No lakes here.");
    }
    if (lakes.length == 1) {
        console.log("There is a single lake here:");
    }
    if (lakes.length > 1) {
        console.log("There are " + lakes.length + " lakes here:");
    }
    for (var i = 0; i < lakes.length; i++) {
        console.log("Lake " + (i + 1) + ": ");
        console.log("Its surface is " + lakes[i].surface + " unit" + isPlural(lakes[i].surface));
        console.log("Its volume is " + lakes[i].volume + " unit" + isPlural(lakes[i].volume));
    }
}
function isPlural(num) {
    var result = "";
    if (num > 1) {
        result = "s";
    }
    return result;
}
function printResults(input) {
    console.log("Given Input: [" + input.toString() + "]");
    var board = drawBoard(input);
    var lakes = countLakes(input, board);
    printLakes(lakes);
    console.log("A representation is: ");
    printBoard(board);
    console.log("");
}
printResults([1, 1, 4, 2, 1, 3]);
printResults([2, 0, 0, 1]);
printResults([1, 0, 0, 2]);
printResults([1, 0, 0, 1]);
printResults([3, 0, 0, 2, 0, 4]);
printResults([1, 4, 2, 5, 0, 6, 2, 3, 4]);
printResults([0, 0, 0, 0]);
printResults([1, 1, 1, 1]);
