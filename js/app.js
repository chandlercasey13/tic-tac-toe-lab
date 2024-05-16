/*-------------------------------- Event Listeners --------------------------------*/


/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let player = 1;
let winner = false;
let tie = false;
let turn = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
/*------------------------ Cached Element References ------------------------*/
const button = document.querySelector("#reset-button");

const squareEls = document.querySelectorAll(".sqr");
squareEls.forEach((tile) => {
  tile.addEventListener("click", handleClick);
});

/*--------------------------------Functions-----------------------------*/
const initalize = function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "";
  winner = false;
  tie = false;
  render();
};
//found out how to add event listener on load online
window.addEventListener("load", initalize);
function render() {
  updateBoard();
  updateMessage();
}

function updateBoard() {
  board.forEach((square, idx) => {
    square = squareEls[idx].textContent;
  });

  console.log(board);
}

function updateMessage() {
  const message = document.querySelector("#message");
  if (winner === false && tie === false) {
    message.textContent = `${turn}'s turn`;
  }
  if (winner === false && tie === true) {
    message.textContent = "Tie";
  }
  if (winner === true) {
    message.textContent = `${turn} Wins!`;
  }
  if (turn === "") {
    message.textContent = "Pick a tile!";
  }
}

function handleClick(event) {
  if (winner || tie) {
    return;
  }
  placePiece(event.target.id);
}

function placePiece(index) {
  board[index] = turn;
  squareEls[index].textContent = turn;

  console.log(board);

  checkForWinner();
  checkForTie();
  switchPlayerTurn();
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  }
  if (turn === "X") {
    turn = "O";
  } else {
    turn = "X";
  }

  updateMessage();
}

function checkForTie() {
  if (winner) {
    return;
  }
  if (board.includes("")) {
    tie = false;
  } else {
    tie = true;
  }
}

function checkForWinner() {
  for (let i = 0; i < winCombos.length; i++) {
    const winCondition = winCombos[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      winner = true;
      updateMessage();
    }
  }
}

button.addEventListener("click", resetButton);

function resetButton() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "";
  squareEls.forEach((tile) => {
    tile.textContent = "";
  });
  initalize();
  updateMessage();
}
