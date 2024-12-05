// script.js
const cells = document.querySelectorAll('.cell');
const winningMessageElement = document.getElementById('resultScreen');
const resultText = document.getElementById('resultText');
const newGameButton = document.getElementById('newGameButton');

const X_CLASS = 'X';
const O_CLASS = 'O';
let currentPlayer = X_CLASS;

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function startGame() {
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessageElement.classList.remove('active');
  currentPlayer = X_CLASS;
}

function handleClick(e) {
  const cell = e.target;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
  }
}

function swapTurns() {
  currentPlayer = currentPlayer === X_CLASS ? O_CLASS : X_CLASS;
}

function checkWin(player) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.textContent === X_CLASS || cell.textContent === O_CLASS;
  });
}

function endGame(draw) {
  if (draw) {
    resultText.textContent = "It's a Draw!";
  } else {
    resultText.textContent = `${currentPlayer} Wins!`;
  }
  winningMessageElement.classList.add('active');
}

newGameButton.addEventListener('click', startGame);

startGame();
