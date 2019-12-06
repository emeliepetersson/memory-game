'use strict';
const memoryBoard = document.querySelector('.memory-board');

const cards = [
    { name: "blown", image: "/images/blown.png", icon: "/images/magnifyer.png" },
    { name: "devil", image: "/images/devil.png", icon: "/images/magnifyer.png" },
    { name: "kiss", image: "/images/kiss.png", icon: "/images/magnifyer.png" },
    { name: "party", image: "/images/party.png", icon: "/images/magnifyer.png" },
    { name: "poop", image: "/images/poop.png", icon: "/images/magnifyer.png" },
    { name: "sad", image: "/images/sad.png", icon: "/images/magnifyer.png" },
    { name: "ssh", image: "/images/ssh.png", icon: "/images/magnifyer.png" },
    { name: "stars", image: "/images/stars.png", icon: "/images/magnifyer.png" }
];


// Create memory-cards and add it to the memory-board
const createCard = (name, frontImage, backImage) => {
    const card = document.createElement('div');
    const front = document.createElement('img');
    const back = document.createElement('img');

    //front side
    front.src = frontImage;
    front.classList.add('front');

    //back side
    back.src = backImage;
    back.classList.add('back');

    //the card
    card.classList.add('memory-card');
    card.dataset.emoji = name;
    card.appendChild(front);
    card.appendChild(back);
    return card;
};

cards.forEach(card => {
    const cardElement = createCard(card.name, card.icon, card.image);
    const cloneCard = cardElement.cloneNode(true); //clone the card to get pairs
    memoryBoard.appendChild((cardElement));
    memoryBoard.appendChild((cloneCard));
});


// Add eventlistener to start-game button to shuffle and show the cards
const startButton = document.querySelector('.start-button');
const scoreBoard = document.querySelector('.score-board');
const usernameForm = document.querySelector('.usernameForm');

function startGame(event) {
    event.currentTarget.classList.add('hide');
    usernameForm.classList.add('hide');
    memoryBoard.classList.add('show-memory-board');
    scoreBoard.classList.add('show-score-board');
    shuffleCards();
    startTimer();
}

//https://scotch.io/tutorials/how-to-build-a-memory-matching-game-in-javascript
function shuffleCards() {
    memoryCards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

startButton.addEventListener('click', startGame);

//Timer
let totalSeconds = 0;
let timer;

function startTimer(){
    timer = setInterval(countTimer, 1000);
}


function countTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.querySelector('.timer').innerHTML = hour + ":" + minute + ":" + seconds;
}

//Stop timer and save username and score in localdata
//Display highscores in list
const username = document.querySelector('.username');
let highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const highscoreTable = document.querySelector('.highscoreTable');

function stopTimer() {
    event.preventDefault();
    
    clearInterval(timer);

    let finalScore = document.querySelector('.timer').textContent;

    const score = { 
        score: finalScore,
        name: username.value
    };

    highScores.push(score);
    // highScores.sort((a, b) => b.score - a.score);
    // highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));
    let localData = JSON.parse(localStorage.getItem('highScores'));

    //show highscores in list
    const list = document.querySelector('ol');
    highscoreTable.appendChild(list);
    localData.forEach(data => {
        const item = document.createElement('li');
        item.innerHTML =data.name + " " + data.score;
        list.appendChild(item);
    });

};

function resetTimer () {
    totalSeconds = 0;
    let hour = 0;
    let minute = 0;
    let seconds = 0;

    document.querySelector('.timer').innerHTML = hour + ":" + minute + ":" + seconds;
}

// When a card is clicked it's flipped over. 
// On the third click: If two cards with same dataset name is clicked they stay flipped,
// otherwise they flip back again.
const memoryCards = document.querySelectorAll('.memory-card');
let cardIsFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;


function flipCard(event) {
    if (lockBoard) return;
    if (event.currentTarget === firstCard) return;

    event.currentTarget.classList.toggle('flip');

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
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        incrementScore();
        resetBoard();
    } else {
        lockBoard = true;
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }
}

function resetBoard() {
    [cardIsFlipped, lockBoard] = [false, false]
    [firstCard, secondCard] = [null, null]
}

memoryCards.forEach(card => card.addEventListener('click', flipCard));


//Increment score when a match is found.
//Replay-button is displayed when all matches have been found,
//when the button is clicked all the cards are flipped and shuffled.
const replayButton = document.querySelector('.replay-button');
const score = document.querySelector('.score');
let scoreCounter = 0;

function incrementScore() {
    score.textContent = ++scoreCounter;
    if (score.textContent === '1') {
        setTimeout(() => {
            scoreBoard.classList.remove('show-score-board');
            memoryBoard.classList.remove('show-memory-board');
            replayButton.classList.add('show');
            highscoreTable.classList.add('show');
        }, 1500);
        stopTimer();
    }
}

function restartGame(event) {
    startGame(event);
    resetBoard();
    resetTimer();
    highscoreTable.classList.remove('show');
    replayButton.classList.remove('show');
    //reset score
    score.textContent = 0;
    scoreCounter = 0;

    //unflip cards
    const flippedCards = document.querySelectorAll('.flip');

    flippedCards.forEach(flippedCard => {
        flippedCard.classList.remove('flip');
    });

    //re-attach eventlistener to cards
    memoryCards.forEach(card => card.addEventListener('click', flipCard));
}
replayButton.addEventListener('click', restartGame);



