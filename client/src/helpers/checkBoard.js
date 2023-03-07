const COMBO_WINNER = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

 export const checkWinner = (boardToCheck) => {
    for (const combo of COMBO_WINNER) {
        const [a, b, c] = combo;

        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }
    }
    return null;
}

export const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square) => square !== null);
}