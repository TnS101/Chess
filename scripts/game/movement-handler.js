export function exe(piece, playerTurn) {

}

function positionHandler(piece, playerTurn) {
    const column = piece.parentElement.parentElement.id;
    const index = piece.parentElement.firstElementChild.textContent;

    const patterns = patternHandler(piece);
    const result = [];

    patterns.reduce(function(curr, pattern) {

        var movementMultiplier = 1;

        if (pattern.movement == 'linear') {
            movementMultiplier = Math.abs(9 - index);

        } else if (pattern.movement == 'diagonal') {
            movementMultiplier = Math.abs(8 - index);
        }

        if (playerTurn) {
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
    const pieceType = piece.className.split('-')[1];

    if (pieceType === "Knight") {
        return [{ direction: 'mirror', columnRange: 2, indexRange: 2, movement: 'single' }];
    }
}