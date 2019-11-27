const memoryBoard = document.querySelector('.memory-board');

// Array with memory-card, 10st
const cards = [
    { name: "blown", image: "/images/blown.png", icon: "/images/magnifyer.png"},
    { name: "devil", image: "/images/devil.png", icon: "/images/magnifyer.png"},
    { name: "kiss", image: "/images/kiss.png", icon: "/images/magnifyer.png"},
    { name: "party", image: "/images/party.png", icon: "/images/magnifyer.png"},
    { name: "poop", image: "/images/poop.png", icon: "/images/magnifyer.png"},
    { name: "sad", image: "/images/sad.png", icon: "/images/magnifyer.png"},
    { name: "ssh", image: "/images/ssh.png", icon: "/images/magnifyer.png"},
    { name: "stars", image: "/images/stars.png", icon: "/images/magnifyer.png"}
]


// Create each memory-card two times each

const createCard = (name, frontIcon, backImage) => {
    const card = document.createElement('div');
    const front = document.createElement('img');
    const back = document.createElement('img');
    
    //front side
    front.src = frontIcon;
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
    const element = createCard(card.name, card.icon, card.image);
    const clone = element.cloneNode(true);
    memoryBoard.appendChild((element));
    memoryBoard.appendChild((clone));
});



// När ett kort klickas vänds det. Vid tredje klicket: 
// Om två element med samma dataset värde klickas i stannar dem 
//uppvända, annars vänds dem igen.

const memoryCards = document.querySelectorAll('.memory-card');
let cardIsFlipped = false;
let lockBoard = false;
let firstCard;
let secondCard;


function flipCard (event) {
    if(lockBoard) return;
    if(event.currentTarget === firstCard) return;

    event.currentTarget.classList.toggle('flip');
    
    if(!cardIsFlipped) {
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
    
    if(firstCard.dataset.emoji === secondCard.dataset.emoji) {
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

// Play-button som vid klick visar alla korten och shufflar dem
const startButton = document.querySelector('.start-button');
const scoreBoard = document.querySelector('.score-board');

function startGame (event) {
    event.currentTarget.classList.add('hide');
    memoryBoard.classList.add('show');
    scoreBoard.classList.add('show');
    shuffleCards();
}

function shuffleCards() {
    memoryCards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

startButton.addEventListener('click', startGame);

//Increment score when match is found
let scoreCounter = 0;
const score = document.querySelector('.score');
function incrementScore() {
    score.textContent = ++scoreCounter;
}

// Restart-button som visas när alla kort har hittats, 
//som vänder på korten och shufflar ordningen