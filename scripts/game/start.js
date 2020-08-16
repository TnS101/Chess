window.onload = start;

export function start() {
    const columnA = document.getElementById("A").querySelectorAll("div");
    columnA[0].appendChild(createPiece("Black-Rook"));
    columnA[7].appendChild(createPiece("White-Rook"));

    const columnB = document.getElementById("B").querySelectorAll("div");
    columnB[0].appendChild(createPiece("Black-Knight"));
    columnB[7].appendChild(createPiece("White-Knight"));

    const columnC = document.getElementById("C").querySelectorAll("div");
    columnC[0].appendChild(createPiece("Black-Bishop-R"));
    columnC[7].appendChild(createPiece("White-Bishop-R"));

    const columnD = document.getElementById("D").querySelectorAll("div");
    columnD[0].appendChild(createPiece("Black-King"));
    columnD[7].appendChild(createPiece("White-King"));

    const columnE = document.getElementById("E").querySelectorAll("div");
    columnE[0].appendChild(createPiece("Black-Queen"));
    columnE[7].appendChild(createPiece("White-Queen"));

    const columnF = document.getElementById("F").querySelectorAll("div");
    columnF[0].appendChild(createPiece("Black-Bishop"));
    columnF[7].appendChild(createPiece("White-Bishop"));

    const columnG = document.getElementById("G").querySelectorAll("div");
    columnG[0].appendChild(createPiece("Black-Knight-R"));
    columnG[7].appendChild(createPiece("White-Knight-R"));

    const columnH = document.getElementById("H").querySelectorAll("div");
    columnH[0].appendChild(createPiece("Black-Rook"));
    columnH[7].appendChild(createPiece("White-Rook"));

    Array.from(document.getElementsByClassName("column")).reduce(function(acc, col, i) {
        col.querySelectorAll("div")[5].appendChild(createPiece("White-Pawn"));
        col.querySelectorAll("div")[0].appendChild(createPiece("Black-Pawn"));
    });
}

function createPiece(name) {
    const piece = document.createElement("div");
    piece.className = name;
    const image = document.createElement("img");
    image.width = 65;
    image.height = 65;
    image.src = `./images/${name}.png`;

    piece.appendChild(image);

    return piece;
}