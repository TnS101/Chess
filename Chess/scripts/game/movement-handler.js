var turnCounter = 0;

export function exe(piece) {

    const possiblePositions = positionHandler(piece, turnCounter);
    possiblePositions.reduce(function(acc, curr) {
        const position = document.getElementById(`${String.fromCharCode(curr.column) + curr.index}`);

        if (position != undefined) {
            const initialColor = position.style.backgroundColor;

            if (!position.className.includes('canMove')) {
                position.className += ' canMove';
            }

            position.style.backgroundColor = 'red';
            position.style.cursor = 'pointer';

            console.log(`Can move to position: ${position.id}!`);

            piece.addEventListener('click', function() {

                tileColorReset(initialColor);

                position.removeEventListener('click', move, true);

                piece.addEventListener('click', function() {
                    exe(piece, turnCounter);
                });
            });

            position.addEventListener('click', function() {
                tileColorReset(initialColor);
                turnCounter = move(position, piece, turnCounter, initialColor);
                console.log(turnCounter);
            });

        } else {
            console.log(`Cannot move to position: ${String.fromCharCode(curr.column) + curr.index}`);
        }

    }, 0);
}

function tileColorReset(initialColor) {
    Array.from(document.getElementsByClassName('canMove')).reduce(function(acc, curr) {
        curr.className = curr.className.slice(0, curr.className.indexOf(' canMove'));
        curr.style.backgroundColor = initialColor;
    }, 0);
}

function turnChecker(turnCounter) {
    const blackPieces = document.getElementsByClassName('Black');
    const whitePieces = document.getElementsByClassName('White');

    if (turnCounter % 2 == 0) {
        Array.from(blackPieces).reduce(function(acc, piece) {
            piece.removeEventListener('click', exe);
        }, 0);

        Array.from(whitePieces).reduce(function(acc, piece) {
            piece.addEventListener('click', function() {
                exe(piece, turnCounter);
            });
        }, 0);

    } else {
        Array.from(whitePieces).reduce(function(acc, piece) {
            piece.removeEventListener('click', exe, true);
        }, 0);

        Array.from(blackPieces).reduce(function(acc, piece) {
            piece.addEventListener('click', function() {
                exe(piece, turnCounter);
            });
        }, 0);
    }

    return ++turnCounter;
}

function move(position, piece, turnCounter, initialColor) {
    position.style.backgroundColor = initialColor;
    piece.removeEventListener('click', exe, true);

    const temp = piece.cloneNode(true);

    temp.addEventListener('click', function() {
        exe(temp, turnCounter);
    });

    position.appendChild(temp);
    piece.parentElement.innerHTML = '';

    return turnChecker(turnCounter);
}

function positionHandler(piece, turnCounter) {
    const column = piece.parentElement.parentElement.id;
    const index = Number(piece.parentElement.id.split('')[1]);

    const patterns = patternHandler(piece);
    const result = [];

    patterns.reduce(function(acc, pattern) {
        var movementMultiplier = 1;

        if (pattern.movement == 'linear') {
            movementMultiplier = Math.abs(9 - index);

        } else if (pattern.movement == 'diagonal') {
            movementMultiplier = Math.abs(8 - index);
        }

        if (turnCounter % 2 == 0) {

            if (pattern.direction == "forward") {
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index + pattern.indexRange * movementMultiplier });

            } else if (pattern.direction == "forwardAndBackward") {
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index + pattern.indexRange * movementMultiplier });
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index - pattern.indexRange * movementMultiplier });

            } else if (pattern.direction == "mirror") {
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index - pattern.indexRange * movementMultiplier }); //back left
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index + pattern.indexRange * movementMultiplier }); //back right
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index - pattern.indexRange * movementMultiplier }); //front left
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index + pattern.indexRange * movementMultiplier }); //front right

            } else if (pattern.direction == "multiple") {


            }

        } else {

            if (pattern.direction == "forward") {
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index - pattern.indexRange * movementMultiplier });

            } else if (pattern.direction == "forwardAndBackward") {
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index - pattern.indexRange * movementMultiplier });
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index + pattern.indexRange * movementMultiplier });

            } else if (pattern.direction == "mirror") {
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index + pattern.indexRange * movementMultiplier });
                result.push({ column: column.charCodeAt(0) + pattern.columnRange, index: index - pattern.indexRange * movementMultiplier });
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index + pattern.indexRange * movementMultiplier });
                result.push({ column: column.charCodeAt(0) - pattern.columnRange, index: index - pattern.indexRange * movementMultiplier });

            } else if (pattern.direction == "multiple") {


            }
        }

    }, 0);

    return result;
}

function patternHandler(piece) {
    const pieceType = piece.className.split(' ')[1];

    if (pieceType === 'Knight') {
        return [{ direction: 'mirror', columnRange: 1, indexRange: 2, movement: 'single' }];
    }
    if (pieceType === 'Pawn') {
        return [{ direction: 'forward', columnRange: 0, indexRange: 1, movement: 'single' }];
    }
    if (pieceType === 'Rook') {
        return [{ direction: 'forwardAndBackward', columnRange: 0, indexRange: 1, movement: 'linear' }];
    }
}