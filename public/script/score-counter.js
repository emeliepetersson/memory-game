"use strict";

//Increment score when a match is found.
//Replay-button and highscore-table is displayed when all matches have been found
const replayButton = document.querySelector(".replay-button");
const score = document.querySelector(".score");
let scoreCounter = 0;

function incrementScore() {
  score.textContent = ++scoreCounter;
  if (score.textContent === "8") {
    setTimeout(() => {
      scoreBoard.classList.remove("show-score-board");
      memoryBoard.classList.remove("show-memory-board");
      replayButton.classList.add("show");
      highscoreTable.classList.add("show");
    }, 1500);
    stopTimer();
  }
}
