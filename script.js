'use strict';
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const loader = document.querySelector('.loader');
const rules = document.querySelector('.rules');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.closeBtn');
const rulesBtn = document.querySelector('.rulesBtn');
const startBtn = document.querySelector('.startBtn');
const start = document.querySelector('.start');
const game = document.querySelector('.game');

let scores, currentScore, activePlayer, playing;

// Loader
window.addEventListener('load', function () {
  setTimeout(function () {
    loader.classList.add('hidden');
  }, 5000);
});

// Start Page
startBtn.addEventListener('click', () => {
  start.classList.add('hidden');
  game.classList.toggle('hidden');
});

// Rules-Button and Modal Window
const modalWindow = function (docEl) {
  docEl.addEventListener('click', () => {
    modal.classList.toggle('hidden');
  });
};
modalWindow(rules);
modalWindow(rulesBtn);
modalWindow(modal);
// close button for modal window
modal.addEventListener('click', function (e) {
  if (e.target.closest('closeBtn'));
  modal.classList.add('hidden');
});

// Quit game
document.querySelector('.exit').addEventListener('click', function () {
  const diceOne = document.querySelector('.one0');
  const diceSix = document.querySelector('.six0');
  diceOne.style.animationDelay = 0 + 's';
  diceSix.style.animationDelay = 0 + 's';
  game.classList.toggle('hidden');
  loader.classList.remove('hidden');
  setTimeout(function () {
    loader.classList.add('hidden');
    start.classList.remove('hidden');
  }, 5000);
  init();
});

// Game Functionality
const init = function () {
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  diceElement.src = 'dice-5.png';
  diceElement.classList.add('hidden');

  playing = true;
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generating a random dice-roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;
    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});
// Hold
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if players score is >=100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});
// New Game
btnNew.addEventListener('click', init);
