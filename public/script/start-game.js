"use strict";

// Add eventlistener to "start game" button. On click: shuffle and show the cards.
const startButton = document.querySelector(".start-button");
const scoreBoard = document.querySelector(".score-board");
const usernameForm = document.querySelector(".username-form");

function startGame(event) {
  event.currentTarget.classList.add("hide");
  usernameForm.classList.add("hide");
  memoryBoard.classList.add("show-memory-board");
  scoreBoard.classList.add("show-score-board");
  shuffleCards();
  startTimer();
}

function shuffleCards() {
  memoryCards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
}

startButton.addEventListener("click", startGame);
