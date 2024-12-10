// Get the canvas element and its context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set up the game parameters
const gridSize = 20; // Grid size for the snake and food
const canvasWidth = 700; // Increased width
const canvasHeight = 580; // Increased height
let snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }]; // Initial snake position
let food = { x: 0, y: 0 }; // Initial food position
let dx = gridSize; // Initial direction (right)
let dy = 0; // Initial vertical direction (no movement)
let score = 0;
let gameOver = false;
let gamePaused = false; // Added gamePaused variable

// Update score display
function updateScore() {
    document.getElementById('score').textContent = score;
}

// Randomly place the food on the grid
function placeFood() {
    food.x = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
}

// Draw the snake on the canvas
function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'black'; // Head is green, body is black
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Draw the food on the canvas
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Move the snake
function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };

    // Check if the snake hits the boundary
    if (head.x < 0 || head.x >= canvasWidth || head.y < 0 || head.y >= canvasHeight) {
        gameOver = true;
        showGameOver();
    }

    // Add the new head to the front of the snake array
    snake.unshift(head);

    // Check if the snake eats food
    if (head.x === food.x && head.y === food.y) {
        score += 10; // Increase score
        placeFood(); // Place new food
    } else {
        snake.pop(); // Remove the last segment of the snake
    }
}

// Check if the snake collides with itself
function checkSelfCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            showGameOver();
        }
    }
}

// Handle key presses to change the snake's direction and pause the game
function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }

    // Pause or resume the game if the spacebar is pressed
    if (event.key === ' ') {
        gamePaused = !gamePaused; // Toggle the pause state
        if (!gamePaused) {
            gameLoop(); // Resume the game if unpaused
        }
    }
}

// Show the game over modal
function showGameOver() {
    document.getElementById('finalScore').textContent = score;
    document.getElementById('gameOverModal').style.display = 'flex';
}

// Restart the game
function restartGame() {
    // Reset the game state
    snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
    dx = gridSize;
    dy = 0;
    score = 0;
    gameOver = false;
    gamePaused = false; // Ensure the game is unpaused after restarting
    placeFood();
    document.getElementById('gameOverModal').style.display = 'none';
    gameLoop();
}

// Game loop function
function gameLoop() {
    if (gameOver || gamePaused) return; // Do nothing if the game is over or paused

    // Clear the canvas for the new frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move the snake, check collisions, and update the game state
    moveSnake();
    checkSelfCollision();

    // Draw the snake and food
    drawSnake();
    drawFood();

    // Update the score display
    updateScore();

    // Repeat the game loop with a slower speed
    setTimeout(gameLoop, 150); // Refresh the game every 150ms (slower speed)
}

// Initialize the game
placeFood();
document.addEventListener('keydown', changeDirection); // Listen for key presses
gameLoop(); // Start the game loop

// Set up retry button functionality
document.getElementById('retryButton').addEventListener('click', restartGame);
