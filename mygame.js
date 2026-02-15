const choices = ["rock", "paper", "scissors"];
const playerDisplay = document.getElementById("playerDisplay");
const computerDisplay = document.getElementById("computerDisplay");
const resultDisplay = document.getElementById("resultDisplay");
const playerScoreDisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
const matchStatus = document.getElementById("matchStatus");
const resetBtn = document.getElementById("resetBtn");

let playerScore = 0;
let computerScore = 0;
let isGameOver = false;

function playGame(playerChoice) {
  if (isGameOver) return;

  // 1. Suspension/Thinking Phase
  resultDisplay.textContent = "THINKING...";
  resultDisplay.classList.remove("greenText", "redText");
  resultDisplay.classList.add("shaking");
  toggleButtons(true);

  setTimeout(() => {
    resultDisplay.classList.remove("shaking");
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result;

    // 2. Game Logic
    if (playerChoice === computerChoice) {
      result = "IT'S A TIE!";
    } else {
      switch (playerChoice) {
        case "rock":
          result = (computerChoice === "scissors") ? "YOU WIN!" : "YOU LOSE!";
          break;
        case "paper":
          result = (computerChoice === "rock") ? "YOU WIN!" : "YOU LOSE!";
          break;
        case "scissors":
          result = (computerChoice === "paper") ? "YOU WIN!" : "YOU LOSE!";
          break;
      }
    }

    // 3. Update Displays
    playerDisplay.textContent = `PLAYER: ${playerChoice.toUpperCase()}`;
    computerDisplay.textContent = `COMPUTER: ${computerChoice.toUpperCase()}`;
    resultDisplay.textContent = result;

    if (result === "YOU WIN!") {
      resultDisplay.classList.add("greenText");
      playerScore++;
      playerScoreDisplay.textContent = playerScore;
    } else if (result === "YOU LOSE!") {
      resultDisplay.classList.add("redText");
      computerScore++;
      computerScoreDisplay.textContent = computerScore;
    }

    checkMatchWinner();
    if (!isGameOver) toggleButtons(false);
  }, 700);
}

function checkMatchWinner() {
  if (playerScore === 5 || computerScore === 5) {
    isGameOver = true;
    matchStatus.textContent = playerScore === 5 ? "🏆 MATCH OVER: YOU WON!" : "💀 MATCH OVER: COMPUTER WON!";
    resetBtn.style.display = "block";
    toggleButtons(true);
  }
}

function toggleButtons(disabled) {
  const btns = document.querySelectorAll('.choice-btn');
  btns.forEach(btn => btn.disabled = disabled);
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  isGameOver = false;
  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;
  resultDisplay.textContent = "";
  matchStatus.textContent = "";
  playerDisplay.textContent = "PLAYER:";
  computerDisplay.textContent = "COMPUTER:";
  resetBtn.style.display = "none";
  toggleButtons(false);
}
