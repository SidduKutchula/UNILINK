const choices = {
  rock: "✊",
  paper: "✋",
  scissors: "✌"
};

let playerScore = 0;
let computerScore = 0;

const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");
const playerScoreSpan = document.getElementById("player-score");
const computerScoreSpan = document.getElementById("computer-score");

document.querySelectorAll(".choice").forEach(button => {
  button.addEventListener("click", () => {
    const playerChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();
    displayChoices(playerChoice, computerChoice);
    determineWinner(playerChoice, computerChoice);
  });
});

function getComputerChoice() {
  const choiceArray = Object.keys(choices);
  return choiceArray[Math.floor(Math.random() * choiceArray.length)];
}

function displayChoices(player, computer) {
  playerChoiceDisplay.textContent = choices[player];
  computerChoiceDisplay.textContent = choices[computer];
}

function determineWinner(player, computer) {
  if (player === computer) {
    resultText.textContent = "It's a draw!";
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    resultText.textContent = "You win!";
    playerScore++;
  } else {
    resultText.textContent = "Computer wins!";
    computerScore++;
  }

  playerScoreSpan.textContent = playerScore;
  computerScoreSpan.textContent = computerScore;
}