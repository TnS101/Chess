var Board = require("./models/board");

var board = new Board(4, 4);
board.setCustomSlot(3, 0);
board.removeCustomSlot(3, 0);

console.log(board.slots[1][1]);

board.print();
