const status = document.querySelector('#status');
const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', cellClicked));
document.querySelector('.newGame').addEventListener('click', newGame);

let gameActive, currentPlayer, gameState;

newGame();
////

function checkResult() {
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        
        if (a === '' || b === '' || c === '') continue;
        if (a === b && b === c) {
            status.innerHTML = `Wygrał gracz ${currentPlayer}`;
            gameActive = false;
            return;
        }
    }
    if (!gameState.includes("")) {
        status.innerHTML = `Remis`;
        gameActive = false;
        return;
    }
    changePlayer();
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    status.innerHTML = `Gracz ${currentPlayer}`;
}

function cellClicked(e) {
    const clicked = e.target;
    const index = parseInt(clicked.dataset.cellNum);
    if (gameState[index] !== "" || !gameActive) return;

    gameState[index] = currentPlayer;
    clicked.innerHTML = currentPlayer;
    checkResult();
}

function newGame() {
    gameActive = true;
    changePlayer()
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell').forEach(c => c.innerHTML = "");
}