const handOptions = {
  paper: "./assets/paper.png",
  scissors: "./assets/scissors.png",
  rock: "./assets/rock.png",
};

const handBgOptions = {
  paper: "./assets/paperbg.png",
  scissors: "./assets/scissorsbg.png",
  rock: "./assets/rockbg.png",
};

const playground = document.querySelector(".playground");
const contest = document.querySelector(".contest");
const nextBtn = document.getElementById("winner");
const resetBtn = document.getElementById("reset");
const opponent = document.querySelector(".decision p");
const res = document.querySelector(".decision h2");
const button = document.querySelector(".newGame");
const scoreboard = document.querySelector(".scoreboard");
const final = document.querySelector(".final");
const finalP = document.querySelector(".final p");
const finalImage = document.getElementById("finalImg");
const finalImage1 = document.getElementById("finalImg1");
const rules = document.querySelector(".features .rules");


// Pick user hand 
const pickUserHand = (userHand) => {
  playground.style.display = "none";
  contest.style.display = "flex";
  nextBtn.style.display = "none";
  document.getElementById("userPick").src = handOptions[userHand];
  document.querySelector(".userhand .bgimg").src = handBgOptions[userHand];
  computerPickImg(userHand);
};

//Pick computer hand
const computerPickImg = (userHand) => {
  let hands = ["rock", "paper", "scissors"];
  let computerHand = hands[Math.floor(Math.random() * 3)];
  document.getElementById("computerPick").src = handOptions[computerHand];
  document.querySelector(".computerhand .bgimg").src = handBgOptions[computerHand];
  resetBtn.style.display = "none";
  referee(userHand, computerHand);
};

const setComputerScore = (score) => {
  computerScore = score;
  localStorage.setItem("Computer-Score", score);
  updateScoreboard();
};

const setUserScore = (score) => {
  userScore = score;
  localStorage.setItem("User-Score", score);
  updateScoreboard();
};

const updateScoreboard = () => {
  document.querySelector(".your-score h1").innerText = userScore;
  document.querySelector(".computer-score h1").innerText = computerScore;
};

const initializeScores = () => {
  userScore = parseInt(localStorage.getItem("User-Score")) || 0;
  computerScore = parseInt(localStorage.getItem("Computer-Score")) || 0;
  updateScoreboard();
};

window.addEventListener("load", initializeScores);

const referee = (userHand, computerHand) => {
  // Display result and set button text
  opponent.style.display = "block";
  res.style.marginBottom = 0;
  button.textContent = "PLAY AGAIN";

  // Determine winner and update scores
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
    // Apply winner effect to user
    document.querySelector(".userhand .handImage .bgimg").classList.add("winnerEffect");
    document.querySelector(".computerhand .handImage .bgimg").classList.remove("winnerEffect");
  } else {
    setDecision("YOU LOST");
    setComputerScore(computerScore + 1);
    // Apply winner effect to computer
    document.querySelector(".computerhand .handImage .bgimg").classList.add("winnerEffect");
    document.querySelector(".userhand .handImage .bgimg").classList.remove("winnerEffect");

  }

  // Hide opponent if it's a tie
  if (userHand === computerHand) {
    opponent.style.display = "none";
    res.style.marginBottom = "2vw";
    button.textContent = "REPLAY";
  }
};

window.addEventListener('storage', (e) => {
  if(e.key === 'User-Score') {
    setUserScore(e.newValue);
    setComputerScore(localStorage.getItem("Computer-Score"));
  }else {
    setComputerScore(e.newValue);
    setUserScore(localStorage.getItem("User-Score"));
  }
}); 

const setDecision = (decision) => {
  res.innerText = decision;
};

const setPlayAgain = () => {
  playground.style.display = "flex";
  scoreboard.style.display = "flex";
  contest.style.display = "none";
  nextBtn.style.display = "none";
  resetBtn.style.display = "none";
  final.style.display = "none";
};

const setWinner = () => {
  contest.style.display = "none";
  resetBtn.style.display = "inline";
    nextBtn.style.display = "none";
    scoreboard.style.display = "none";
    final.style.display = "flex";
    // finalP.innerText = "YOU WON THE GAME";
};

const showRuleImage = () => {
  rules.style.display = "inline";
};

const hideRuleImage = () => {
  rules.style.display = "none";
};