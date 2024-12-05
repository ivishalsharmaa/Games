// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 320;
canvas.height = 480;

// Game variables
let birdY = 150; // Bird's Y position
let birdSpeed = 0; // Bird's speed (gravity effect)
const gravity = 0.2; // Gravity strength (slower fall)
const lift = -5; // Force that makes the bird fly upwards (slower flap)
const birdWidth = 20;
const birdHeight = 20;

// Pipes
const pipeWidth = 100;
const pipeGap = 300; // Increased gap between pipes (from 150 to 200)
let pipes = [];
const pipeSpeed = 1.5; // Pipe movement speed (slower movement)

// Game state
let gameOver = false;
let score = 0;
let gameStarted = false;

// DOM Elements for game over screen
const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

// Bird movement on arrow key press
document.addEventListener("keydown", (e) => {
  if (e.code === "ArrowUp" && !gameOver) {
    birdSpeed = lift; // Lift the bird upwards on up arrow press
  }
  if (e.code === "ArrowDown" && !gameOver) {
    birdSpeed = 1; // Move the bird downward at a controlled speed on down arrow press
  }
});

// Start the game on first click
canvas.addEventListener("click", () => {
  if (!gameStarted) {
    gameStarted = true;
    updateGame(); // Start the game loop
  }
  if (gameOver) {
    restartGame(); // Restart the game
  }
});

// Pipe generation
function generatePipe() {
  const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap)); // Random pipe height
  pipes.push({
    x: canvas.width,
    top: pipeHeight,
    bottom: pipeHeight + pipeGap
  });
}

// Draw the bird
function drawBird() {
  ctx.fillStyle = "yellow";
  ctx.fillRect(50, birdY, birdWidth, birdHeight);
}

// Draw the pipes
function drawPipes() {
  ctx.fillStyle = "green";
  pipes.forEach((pipe) => {
    ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top); // Top pipe
    ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom); // Bottom pipe
  });
}

// Check for collisions
function checkCollisions() {
  // Collision with pipes
  for (let i = 0; i < pipes.length; i++) {
    if (
      50 + birdWidth > pipes[i].x && // Bird's right side
      50 < pipes[i].x + pipeWidth && // Bird's left side
      (birdY < pipes[i].top || birdY + birdHeight > pipes[i].bottom) // Bird's top or bottom outside pipe range
    ) {
      gameOver = true;
    }
  }

  // Collision with ground or ceiling
  if (birdY + birdHeight > canvas.height || birdY < 0) {
    gameOver = true;
  }
}

// Update game logic
function updateGame() {
  if (gameOver) {
    gameOverScreen.style.display = "block"; // Show game over screen
    finalScore.textContent = score; // Display the final score
    return;
  }

  // Apply gravity (slower fall)
  birdSpeed += gravity;
  birdY += birdSpeed;

  // Move pipes and generate new pipes
  pipes.forEach((pipe) => {
    pipe.x -= pipeSpeed;
  });

  // Remove pipes that are off the screen
  pipes = pipes.filter((pipe) => pipe.x + pipeWidth > 0);

  // Generate new pipes at intervals
  if (Math.random() < 0.02) {
    generatePipe();
  }

  // Draw everything
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
  drawBird();
  drawPipes();

  // Update score
  pipes.forEach((pipe) => {
    if (pipe.x + pipeWidth < 50 && !pipe.passed) {
      score++; // Increment score when a pipe is passed
      pipe.passed = true;
    }
  });

  // Check for collisions
  checkCollisions();

  // Draw score at the top-right corner
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Score: " + score, canvas.width - 100, 30);

  // Request next animation frame
  requestAnimationFrame(updateGame);
}

// Restart the game
function restartGame() {
  gameOver = false;
  gameStarted = false;
  birdY = 150;
  birdSpeed = 0;
  pipes = [];
  score = 0;
  gameOverScreen.style.display = "none"; // Hide the game over screen
  updateGame(); // Start a new game
}

// Restart button event listener
restartBtn.addEventListener("click", restartGame);
