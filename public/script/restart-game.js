"use strict";

//when the replay-button is clicked all the cards are flipped and shuffled and the game starts over again.
function restartGame(event) {
  startGame(event);
  resetBoard();
  resetTimer();
  highscoreTable.classList.remove("show");
  replayButton.classList.remove("show");

  //reset score
  score.textContent = 0;
  scoreCounter = 0;

  //unflip cards
  const flippedCards = document.querySelectorAll(".flip");

  flippedCards.forEach(flippedCard => {
    flippedCard.classList.remove("flip");
  });

  //re-attach eventlistener to all cards
  memoryCards.forEach(card => card.addEventListener("click", flipCard));
}
replayButton.addEventListener("click", restartGame);
