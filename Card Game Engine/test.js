var Board = require("./models/board");

var board = new Board(4, 4);
board.setCustomSlot(1, 3);

board.print();
