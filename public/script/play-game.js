"use strict";

// When a card is clicked it's flipped over.
// On the third click: If two cards with same dataset name is clicked they stay flipped,
// otherwise they flip back again.
const memoryCards = document.querySelectorAll(".memory-card");
let cardIsFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;

function flipCard(event) {
  if (lockBoard) return;
  if (event.currentTarget === firstCard) return;

  event.currentTarget.classList.toggle("flip");

  if (!cardIsFlipped) {
    //First click
    cardIsFlipped = true;
    firstCard = event.currentTarget;
  } else {
    //Second click
    cardIsFlipped = false;
    secondCard = event.currentTarget;

    checkForMatch();
  }
}

function checkForMatch() {
  if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    incrementScore();
    resetBoard();
  } else {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1500);
  }
}

function resetBoard() {
  [cardIsFlipped, lockBoard] = [false, false][(firstCard, secondCard)] = [
    null,
    null
  ];
}

memoryCards.forEach(card => card.addEventListener("click", flipCard));
