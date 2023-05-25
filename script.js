const player__1 = document.getElementById("player-1");
const player__2 = document.getElementById("player-2");
const totalScore__1 = document.querySelector(".total_1");
const totalScore__2 = document.querySelector(".total_2");
const currentScore__1 = document.querySelector(".current-score-1");
const currentScore__2 = document.querySelector(".current-score-2");
const dice = document.images[0];

const btnRoll = document.querySelector(".roll");
const btnHold = document.querySelector(".hold");
const btnReset = document.querySelector(".reset");

const chngPlayer = function () {
  currentScore = 0;
  document.querySelector(`.current-score-${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 1 ? 2 : 1;
  player__1.classList.toggle("active");
  player__2.classList.toggle("active");
};

const reset = function () {
  currentScore = 0;
  activePlayer = 1;
  score = [0, 0];
  playing = true;
  totalScore__1.textContent = 0;
  totalScore__2.textContent = 0;
  currentScore__1.textContent = 0;
  currentScore__2.textContent = 0;
  document.getElementById(`player-${activePlayer}`).classList.remove("winner");
  document.querySelector(`.winner-msg-${activePlayer}`).style.display = "none";
  player__1.classList.add("active");
  player__2.classList.remove("active");
};

let currentScore, activePlayer, score, playing;

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. generating a dice number
    const diceRoll = Math.floor(Math.random() * 6 + 1);
    // 2. showing the dice
    dice.src = `dice-${diceRoll}.png`;
    dice.style.display = "block";
    // 3. check the dice number
    if (diceRoll !== 1) {
      // 4. Accumulating current score
      currentScore += diceRoll;
      document.querySelector(`.current-score-${activePlayer}`).textContent =
        currentScore;
    } else {
      // 5. chng player
      chngPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1.Adding score to current player
    score[activePlayer - 1] += currentScore;
    document.querySelector(`.total_${activePlayer}`).textContent =
      score[activePlayer - 1];
    console.log(score);

    // checking for total score
    if (score[activePlayer - 1] >= 100) {
      // 2. case the player wins and the game is finishe
      playing = false;
      document.getElementById(`player-${activePlayer}`).classList.add("winner");
      document.querySelector(`.winner-msg-${activePlayer}`).style.display =
        "block";
      player__1.classList.remove("active");
      player__2.classList.remove("active");
    } else {
      // 3. the game isn't finished
      chngPlayer();
    }
  }
});

btnReset.addEventListener("click", reset);
