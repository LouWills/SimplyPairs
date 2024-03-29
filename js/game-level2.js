//Memory Game based of off https://github.com/taniarascia/memory

// playing card data
const cardsArray = [{
    name: 'joker',
    img: 'png/black_joker.png',
},
{
    name: 'aceSpades',
    img: 'png/ace_of_spades.png',
},
{
    name: 'aceHearts',
    img: 'png/ace_of_hearts.png',
},
{
    name: '10Diamonds',
    img: 'png/10_of_diamonds.png',
},
{
    name: '10Clubs',
    img: 'png/10_of_clubs.png',
},
{
    name: 'queenDiamonds',
    img: 'png/queen_of_diamonds.png',
},
{
    name: 'queenHearts',
    img: 'png/queen_of_hearts.png',
},
{
    name: 'kingSpades',
    img: 'png/king_of_spades.png',
},
{
    name: '7Hearts',
    img: 'png/7_of_hearts.png',
},
]

const gameGrid = cardsArray
.concat(cardsArray)
.sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;
let turnCounter = 0;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'lvl2-grid');
game.appendChild(grid);

gameGrid.forEach(item => {
const { name, img } = item;

const card = document.createElement('div');
card.classList.add('card');
card.dataset.name = name;

const front = document.createElement('div');
front.classList.add('front');

const back = document.createElement('div');
back.classList.add('back');
back.style.backgroundImage = `url(${img})`;

grid.appendChild(card);
card.appendChild(front);
card.appendChild(back);
});

const match = () => {
const selected = document.querySelectorAll('.selected');
selected.forEach(card => {
card.classList.add('match');
});
};

const resetGuesses = () => {
firstGuess = '';
secondGuess = '';
count = 0;
previousTarget = null;

var selected = document.querySelectorAll('.selected');
selected.forEach(card => {
card.classList.remove('selected');
});
};

grid.addEventListener('click', event => {

const clicked = event.target;

if (
clicked.nodeName === 'SECTION' ||
clicked === previousTarget ||
clicked.parentNode.classList.contains('selected') ||
clicked.parentNode.classList.contains('match')
) {
return;
}

if (count < 2) {
count++;
if (count === 1) {
  firstGuess = clicked.parentNode.dataset.name;
  console.log(firstGuess);
  clicked.parentNode.classList.add('selected');
} else {
  secondGuess = clicked.parentNode.dataset.name;
  console.log(secondGuess);
  clicked.parentNode.classList.add('selected');
  turnCounter++;
  console.log(turnCounter);
  document.getElementById("turns").innerHTML = `<h2>Turns: ${turnCounter}</h2>`;
}

if (firstGuess && secondGuess) {
  if (firstGuess === secondGuess) {
    setTimeout(match, delay);
  }
  setTimeout(resetGuesses, delay);
}
previousTarget = clicked;
}

});