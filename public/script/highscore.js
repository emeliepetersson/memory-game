"use strict";

//Save username and score(time) in localdata and display scores in a list
const username = document.querySelector(".username");
const highscoreTable = document.querySelector(".highscoreTable");
let highScores = JSON.parse(localStorage.getItem("highScores")) || []; //if localstorage.getItem('highScores') is not set yet, create an empty array.

function saveHighscores() {
  let finalScore = document.querySelector(".timer").textContent;

  const score = {
    score: finalScore,
    name: username.value
  };

  highScores.push(score);

  localStorage.setItem("highScores", JSON.stringify(highScores)); //If it is not set yet

  let localData = JSON.parse(localStorage.getItem("highScores"));

  //show highscores in list
  const list = document.querySelector("ol");

  if (list.innerHTML === "") {
    //This runs the first time (or when the page has reloaded), when the ol is empty
    localData.forEach(data => {
      const item = document.createElement("li");
      item.innerHTML = data.name + " " + data.score;
      list.appendChild(item);
    });
  } else {
    //This runs when the player has restarted the game
    const item = document.createElement("li");
    let lastScore = localData[localData.length - 1];
    item.textContent = lastScore.name + " " + lastScore.score;
    list.appendChild(item);
  }
}
