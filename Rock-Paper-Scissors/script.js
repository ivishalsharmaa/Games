// Get all elements
const playerChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("comp-choice");
const gameResultDisplay = document.getElementById("game-result");
const newGameButton = document.getElementById("new-game-btn");

const choices = document.querySelectorAll(".choice");

// Available choices and corresponding images
const choicesArr = ["rock", "paper", "scissors"];
const choiceImages = {
    rock: "images/rock.png", // Path to image for rock
    paper: "images/paper.png", // Path to image for paper
    scissors: "images/scissors.png" // Path to image for scissors
};

// Function to start a new game
function startNewGame() {
    gameResultDisplay.textContent = "Choose your move!";
    // Hide all images
    document.querySelectorAll(".comp-option").forEach(img => {
        img.style.visibility = "hidden";
    });
    playerChoiceDisplay.querySelectorAll(".choice").forEach(choice => {
        choice.disabled = false;
    });
}

// Event listeners for each button
choices.forEach(choice => {
    choice.addEventListener("click", (e) => {
        // Disable buttons once a choice is made
        playerChoiceDisplay.querySelectorAll(".choice").forEach(button => {
            button.disabled = true;
        });
        
        const playerChoice = e.target.id;
        const computerChoice = getComputerChoice();
        
        // Update choices
        gameResultDisplay.textContent = getResult(playerChoice, computerChoice);

        // Show only the chosen computer image
        showComputerChoice(computerChoice);
    });
});

// Function to get a random choice for the computer
function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choicesArr.length);
    return choicesArr[randomIndex];
}

// Function to show the computer's choice image
function showComputerChoice(choice) {
    // Hide all images first
    document.querySelectorAll(".comp-option").forEach(img => {
        img.style.visibility = "hidden";
    });

    // Show only the selected image
    const selectedImage = document.getElementById("comp-" + choice);
    if (selectedImage) {
        selectedImage.style.visibility = "visible";
    }
}

// Function to determine the result
function getResult(playerChoice, computerChoice) {
    if  ((playerChoice === "rock" && computerChoice === "rock") ||
    (playerChoice === "paper" && computerChoice === "paper") ||
    (playerChoice === "scissors" && computerChoice === "scissors") )
    {

        return "It's a draw!";
    }

    else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) 
    {
        return "You win!";
    } 
    else {
        return "You lose!";
    }
}

// Event listener for the "New Game" button
newGameButton.addEventListener("click", startNewGame);
