'use strict';

// selecting elements and storing them
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const name0El = document.getElementById('name--0');
const name1El = document.getElementById('name--1');

const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn-roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer;
let playing; // State variable to show if the game is being played or NOT

function init() {
  // initializing the scores values to zero
  score0El.textContent = 0;
  score1El.textContent = 0;

  // Hiding the dice at the beginning of the game
  diceEl.classList.add('hidden');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
}

init();

function switchPlayer() {
  // Switch to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  // if(activePlayer === 0) {
  //     activePlayer === 1;
  // } else {
  //     activePlayer === 0;
  // }
  // Same as the above if else ⬆
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling dice functionality
function rollDice() {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    // Dynamically showing the dice depending on the rolled dice
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1.
    if (dice !== 1) {
      // Add rolled dice to current score
      currentScore = currentScore + dice;
      // Dynamically displaying the score based on Who's the active player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      diceEl.classList.add('hidden');
      switchPlayer();
    }
  }
}
btnRoll.addEventListener('click', rollDice);

function holdDice() {
  diceEl.classList.add('hidden');
  if (playing) {
    // 1. Add current score to active player's score and display it
    scores[activePlayer] += currentScore;
    // i.e scores[1] = scores[1] + currentscore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if players score >= 100;
    if (scores[activePlayer] >= 100) {
      // If activeplayers scores
      // if YES, Finish the game and current player wins
      playing = false;
      diceEl.classList.add('hidden'); // Hides the dice

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
}

btnHold.addEventListener('click', holdDice);
btnNew.addEventListener('click', init);
