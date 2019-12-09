"use strict";

let totalSeconds = 0;
let timer;

function startTimer() {
  timer = setInterval(countTimer, 1000); //Set interval to 1 second
}

//Change time in the timer-element
function countTimer() {
  ++totalSeconds; //For each second this variable increase with 1
  let hour = Math.floor(totalSeconds / 3600);
  let minute = Math.floor((totalSeconds - hour * 3600) / 60);
  let seconds = totalSeconds - (hour * 3600 + minute * 60);

  document.querySelector(".timer").innerHTML =
    hour + ":" + minute + ":" + seconds;
}

//Stop timer and call saveHighscores function
function stopTimer() {
  event.preventDefault();

  clearInterval(timer); //This stop the timer

  saveHighscores();
}

//Reset timer (when restart button is clicked)
function resetTimer() {
  totalSeconds = 0;
  let hour = 0;
  let minute = 0;
  let seconds = 0;

  document.querySelector(".timer").innerHTML =
    hour + ":" + minute + ":" + seconds;
}
