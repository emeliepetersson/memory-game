"use strict";

const memoryBoard = document.querySelector(".memory-board");

const cards = [
  { name: "blown", image: "images/blown.png", icon: "images/magnifyer.png" },
  { name: "devil", image: "images/devil.png", icon: "images/magnifyer.png" },
  { name: "kiss", image: "images/kiss.png", icon: "images/magnifyer.png" },
  { name: "party", image: "images/party.png", icon: "images/magnifyer.png" },
  { name: "poop", image: "images/poop.png", icon: "images/magnifyer.png" },
  { name: "sad", image: "images/sad.png", icon: "images/magnifyer.png" },
  { name: "ssh", image: "images/ssh.png", icon: "images/magnifyer.png" },
  { name: "stars", image: "images/stars.png", icon: "images/magnifyer.png" }
];

// Create memory-cards and add it to the memory-board
const createCard = (name, frontImage, backImage) => {
  const card = document.createElement("div");
  const front = document.createElement("img");
  const back = document.createElement("img");

  //front side
  front.src = frontImage;
  front.classList.add("front");

  //back side
  back.src = backImage;
  back.classList.add("back");

  //the card
  card.classList.add("memory-card");
  card.dataset.emoji = name;
  card.appendChild(front);
  card.appendChild(back);
  return card;
};

cards.forEach(card => {
  const cardElement = createCard(card.name, card.icon, card.image);
  const cloneCard = cardElement.cloneNode(true); //clone the card to get pairs
  memoryBoard.appendChild(cardElement);
  memoryBoard.appendChild(cloneCard);
});
