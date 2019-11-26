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


// Play-button som vid klick visar alla korten och shufflar dem

// När ett kort klickas vänds det. Vid tredje klicket: 
// Om två element med samma dataset värde klickas i stannar dem 
//uppvända, annars vänds dem igen.

// Restart-button som visas när alla kort har hittats, 
//som vänder på korten och shufflar ordningen