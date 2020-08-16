import { exe } from './movement-handler.js';

window.onload = start;

export function start() {
    const columnA = document.getElementById("A").querySelectorAll("div");

    const blackRook = createPiece("Black-Rook");
    const whiteRook = createPiece("White-Rook");

    columnA[0].appendChild(blackRook);
    columnA[7].appendChild(whiteRook);

    blackRook.addEventListener('click', function() {
        exe(blackRook, true);
    });

    whiteRook.addEventListener('click', function() {
        exe(blackRook, true);
    });

    const columnB = document.getElementById("B").querySelectorAll("div");

    const blackKnight = createPiece("Black-Knight");
    const whiteKnight = createPiece("White-Knight");

    columnB[0].appendChild(blackKnight);
    columnB[7].appendChild(whiteKnight);

    blackKnight.addEventListener('click', function() {
        exe(blackKnight, true);
    });

    whiteKnight.addEventListener('click', function() {
        exe(whiteKnight, true);
    });

    const columnC = document.getElementById("C").querySelectorAll("div");

    const blackBishopR = createPiece("Black-Bishop-R");
    const whiteBishopR = createPiece("White-Bishop-R");

    columnC[0].appendChild(blackBishopR);
    columnC[7].appendChild(whiteBishopR);

    blackBishopR.addEventListener('click', function() {
        exe(blackBishopR, true);
    });

    whiteBishopR.addEventListener('click', function() {
        exe(whiteBishopR, true);
    });

    const columnD = document.getElementById("D").querySelectorAll("div");

    const blackKing = createPiece("Black-King");
    const whiteKing = createPiece("White-King");

    columnD[0].appendChild(blackKing);
    columnD[7].appendChild(whiteKing);

    blackKing.addEventListener('click', function() {
        exe(blackKing, true);
    });

    whiteKing.addEventListener('click', function() {
        exe(whiteKing, true);
    });

    const columnE = document.getElementById("E").querySelectorAll("div");

    const blackQueen = createPiece("Black-Queen");
    const whiteQueen = createPiece("White-Queen");

    columnE[0].appendChild(blackQueen);
    columnE[7].appendChild(whiteQueen);

    blackQueen.addEventListener('click', function() {
        exe(blackQueen, true);
    });

    whiteQueen.addEventListener('click', function() {
        exe(whiteQueen, true);
    });

    const columnF = document.getElementById("F").querySelectorAll("div");

    const blackBishop = createPiece("Black-Bishop");
    const whiteBishop = createPiece("White-Bishop");

    columnF[0].appendChild(blackBishop);
    columnF[7].appendChild(whiteBishop);

    blackBishop.addEventListener('click', function() {
        exe(blackBishop, true);
    });

    whiteBishop.addEventListener('click', function() {
        exe(whiteBishop, true);
    });

    const columnG = document.getElementById("G").querySelectorAll("div");

    const blackKnightR = createPiece("Black-Knight-R");
    const whitekKnightR = createPiece("White-Knight-R");

    columnG[0].appendChild(blackKnightR);
    columnG[7].appendChild(whitekKnightR);

    blackKnightR.addEventListener('click', function() {
        exe(blackKnightR, true);
    });

    whitekKnightR.addEventListener('click', function() {
        exe(whitekKnightR, true);
    });

    const columnH = document.getElementById("H").querySelectorAll("div");

    const blackRook2 = blackRook;
    const whiteRook2 = whiteRook;

    columnH[0].appendChild(blackRook2);
    columnH[7].appendChild(whiteRook2);

    Array.from(document.getElementsByClassName("column")).reduce(function(acc, col) {
        const blackPawn = createPiece("Black-Pawn");
        const whitePawn = createPiece("White-Pawn");

        col.querySelectorAll("div")[7].appendChild(whitePawn);
        col.querySelectorAll("div")[2].appendChild(blackPawn);

        blackPawn.addEventListener('click', function() {
            exe(blackPawn, false);
        });

        whitePawn.addEventListener('click', function() {
            exe(whitePawn, false);
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