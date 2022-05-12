"use strict";

const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
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

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restartBtn = document.getElementById("restartButton");

const winnigMessageTextEkement = document.querySelector(
  "[data-winning-message-text"
);
const winningMessageElement = document.getElementById("winning__message");

let circleTurn;

const endGame = (draw) => {
  if (draw) {
    winnigMessageTextEkement.innerText = "Draw";
  } else {
    winnigMessageTextEkement.innerText = `${
      circleTurn ? "O's" : "X's"
    } Wins ! `;
  }
  winningMessageElement.classList.add("show");
};

// Initial Hover State
const startGame = () => {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
};

startGame();

const placeMark = (cell, currentClass) => {
  cell.classList.add(currentClass);
};

const swapTurns = () => {
  circleTurn = !circleTurn; // circleTurn is set to the opposite of circleTurn ie (if X then 0 and viceversa)
};

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

const checkWin = (currentClass) => {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
};

const isDraw = () => {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
};

// In an array of winning combintions if there's atleast one combination in which every value at cell's index is contains currentClass

function handleClick(e) {
  const cell = e.target;
  // console.log(cell);

  let currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS; // here if circleTurn is true then it should return CIRClE_CLASS OTHERWISE it'll return X_CLASS. As cirlcTurn is undefined, it's a falsy value hence it returned X_CLASS

  // 1. Place Mark
  placeMark(cell, currentClass);

  // 2. Check for Win
  if (checkWin(currentClass)) {
    endGame(false);
  }
  // 3. Check for Draw
  else if (isDraw()) {
    endGame(true);
  } else {
    // 4. Switch Turns
    swapTurns();
    setBoardHoverClass();
  }
}

// if once is set to true then the event will be fired only once for that particular element

restartBtn.addEventListener("click", startGame);
