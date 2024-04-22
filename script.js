// Object containing image paths for different hand options
const handOptions = {
  paper: "./assets/paper.png",
  scissors: "./assets/scissors.png",
  rock: "./assets/rock.png",
};

// Object containing background image paths for different hand options
const handBgOptions = {
  paper: "./assets/paperbg.png",
  scissors: "./assets/scissorsbg.png",
  rock: "./assets/rockbg.png",
};

// DOM elements
const playground = document.querySelector(".playground");
const contest = document.querySelector(".contest");
const nextBtn = document.getElementById("winner");
const resetBtn = document.getElementById("reset");
const opponent = document.querySelector(".decision p");
const res = document.querySelector(".decision h2");
const button = document.querySelector(".newGame");
const scoreboard = document.querySelector(".scoreboard");
const final = document.querySelector(".final");
const rules = document.querySelector(".features .rules");

// Initialize user and computer scores
let userScore = 0;
let computerScore = 0;

// Function to update scoreboard in the DOM
const updateScoreboard = () => {
  document.querySelector(".your-score h1").innerText = userScore;
  document.querySelector(".computer-score h1").innerText = computerScore;
};

// Function to initialize scores from local storage
const initializeScores = () => {
  userScore = parseInt(localStorage.getItem("User-Score")) || 0;
  computerScore = parseInt(localStorage.getItem("Computer-Score")) || 0;
  updateScoreboard();
};

// Function to handle user hand selection
const pickUserHand = (userHand) => {
  playground.style.display = "none";
  contest.style.display = "flex";
  nextBtn.style.display = "none";
  document.getElementById("userPick").src = handOptions[userHand];
  document.querySelector(".userhand .bgimg").src = handBgOptions[userHand];
  computerPickImg(userHand);
};

// Function to randomly select computer hand
const computerPickImg = (userHand) => {
  const hands = ["rock", "paper", "scissors"];
  const computerHand = hands[Math.floor(Math.random() * 3)];
  document.getElementById("computerPick").src = handOptions[computerHand];
  document.querySelector(".computerhand .bgimg").src = handBgOptions[computerHand];
  referee(userHand, computerHand);
};

// Function to update user score and store in local storage
const setUserScore = (score) => {
  userScore = score;
  localStorage.setItem("User-Score", score);
  updateScoreboard();
};

// Function to update computer score and store in local storage
const setComputerScore = (score) => {
  computerScore = score;
  localStorage.setItem("Computer-Score", score);
  updateScoreboard();
};

// Function to handle game result
const referee = (userHand, computerHand) => {
  opponent.style.display = "block";
  res.style.marginBottom = 0;
  button.textContent = "PLAY AGAIN";

  if (userHand === computerHand) {
    setDecision("TIE UP");
    document.querySelector(".computerhand .handImage .bgimg").classList.remove("winnerEffect");
    document.querySelector(".userhand .handImage .bgimg").classList.remove("winnerEffect");
  } else if (
    (userHand === "paper" && computerHand === "rock") ||
    (userHand === "rock" && computerHand === "scissors") ||
    (userHand === "scissors" && computerHand === "paper")
  ) {
    setDecision("YOU WIN");
    setUserScore(userScore + 1);
    nextBtn.style.display = "inline";
    contest.style.display = "flex";
    document.querySelector(".userhand .handImage .bgimg").classList.add("winnerEffect");
    document.querySelector(".computerhand .handImage .bgimg").classList.remove("winnerEffect");
  } else {
    setDecision("YOU LOST");
    setComputerScore(computerScore + 1);
    document.querySelector(".computerhand .handImage .bgimg").classList.add("winnerEffect");
    document.querySelector(".userhand .handImage .bgimg").classList.remove("winnerEffect");
  }

  if (userHand === computerHand) {
    opponent.style.display = "none";
    res.style.marginBottom = "2vw";
    button.textContent = "REPLAY";
  }
};

// Event listener for window's load event to initialize scores
window.addEventListener("load", initializeScores);

// Event listener for storage changes to sync scores across tabs
window.addEventListener('storage', (e) => {
  if (e.key === 'User-Score') {
    setUserScore(parseInt(e.newValue));
  } else if (e.key === 'Computer-Score') {
    setComputerScore(parseInt(e.newValue));
  }
});

// Function to set decision text
const setDecision = (decision) => {
  res.innerText = decision;
};

// Function to reset game state
const setPlayAgain = () => {
  playground.style.display = "flex";
  scoreboard.style.display = "flex";
  contest.style.display = "none";
  nextBtn.style.display = "none";
  resetBtn.style.display = "none";
  final.style.display = "none";
};

// Function to display rules image
const showRuleImage = () => {
  rules.style.display = "inline";
};

// Function to hide rules image
const hideRuleImage = () => {
  rules.style.display = "none";
};

const setWinner = () => {
  contest.style.display = "none";
  resetBtn.style.display = "inline";
  nextBtn.style.display = "none";
  scoreboard.style.display = "none";
  final.style.display = "flex";
};