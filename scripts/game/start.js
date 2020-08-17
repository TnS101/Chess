import { exe } from './movement-handler.js';

window.onload = start;

export function start() {
    const columnA = document.getElementById("A").querySelectorAll("div");

    const blackRook = createPiece("Black Rook");
    const whiteRook = createPiece("White Rook");

    columnA[0].appendChild(blackRook);
    columnA[7].appendChild(whiteRook);

    blackRook.addEventListener('click', function() {
        exe(blackRook);
    });

    whiteRook.addEventListener('click', function() {
        exe(blackRook);
    });

    const columnB = document.getElementById("B").querySelectorAll("div");

    const blackKnight = createPiece("Black Knight");
    const whiteKnight = createPiece("White Knight");

    columnB[0].appendChild(blackKnight);
    columnB[7].appendChild(whiteKnight);

    blackKnight.addEventListener('click', function() {
        exe(blackKnight);
    });

    whiteKnight.addEventListener('click', function() {
        exe(whiteKnight);
    });

    const columnC = document.getElementById("C").querySelectorAll("div");

    const blackBishopR = createPiece("Black Bishop R");
    const whiteBishopR = createPiece("White Bishop R");

    columnC[0].appendChild(blackBishopR);
    columnC[7].appendChild(whiteBishopR);

    blackBishopR.addEventListener('click', function() {
        exe(blackBishopR);
    });

    whiteBishopR.addEventListener('click', function() {
        exe(whiteBishopR);
    });

    const columnD = document.getElementById("D").querySelectorAll("div");

    const blackKing = createPiece("Black King");
    const whiteKing = createPiece("White King");

    columnD[0].appendChild(blackKing);
    columnD[7].appendChild(whiteKing);

    blackKing.addEventListener('click', function() {
        exe(blackKing);
    });

    whiteKing.addEventListener('click', function() {
        exe(whiteKing);
    });

    const columnE = document.getElementById("E").querySelectorAll("div");

    const blackQueen = createPiece("Black Queen");
    const whiteQueen = createPiece("White Queen");

    columnE[0].appendChild(blackQueen);
    columnE[7].appendChild(whiteQueen);

    blackQueen.addEventListener('click', function() {
        exe(blackQueen);
    });

    whiteQueen.addEventListener('click', function() {
        exe(whiteQueen);
    });

    const columnF = document.getElementById("F").querySelectorAll("div");

    const blackBishop = createPiece("Black Bishop");
    const whiteBishop = createPiece("White Bishop");

    columnF[0].appendChild(blackBishop);
    columnF[7].appendChild(whiteBishop);

    blackBishop.addEventListener('click', function() {
        exe(blackBishop);
    });

    whiteBishop.addEventListener('click', function() {
        exe(whiteBishop);
    });

    const columnG = document.getElementById("G").querySelectorAll("div");

    const blackKnightR = createPiece("Black Knight R");
    const whitekKnightR = createPiece("White Knight R");

    columnG[0].appendChild(blackKnightR);
    columnG[7].appendChild(whitekKnightR);

    blackKnightR.addEventListener('click', function() {
        exe(blackKnightR);
    });

    whitekKnightR.addEventListener('click', function() {
        exe(whitekKnightR);
    });

    const columnH = document.getElementById("H").querySelectorAll("div");

    const blackRook2 = blackRook.cloneNode(true);
    const whiteRook2 = whiteRook.cloneNode(true);

    columnH[0].appendChild(blackRook2);
    columnH[7].appendChild(whiteRook2);

    Array.from(document.getElementsByClassName("column")).reduce(function(acc, col) {
        const blackPawn = createPiece("Black Pawn");
        const whitePawn = createPiece("White Pawn");

        col.querySelectorAll("div")[7].appendChild(whitePawn);
        col.querySelectorAll("div")[2].appendChild(blackPawn);

        blackPawn.addEventListener('click', function() {
            exe(blackPawn);
        });

        whitePawn.addEventListener('click', function() {
            exe(whitePawn);
        });
    }, 0);
}

export function createPiece(name) {
    const piece = document.createElement("div");
    piece.className = name;
    piece.style.cursor = 'pointer';
    const image = document.createElement("img");
    image.width = 65;
    image.height = 65;
    image.src = `./images/${name}.png`;

    piece.appendChild(image);

    return piece;
}