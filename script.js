const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxSize = 20;
const canvasSize = canvas.width;
let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
let direction = "RIGHT";
let food = {
    x: Math.floor((Math.random() * canvasSize) / boxSize) * boxSize,
    y: Math.floor((Math.random() * canvasSize) / boxSize) * boxSize,
};
let score = 0;

// Draw the snake
function drawSnake() {
    snake.forEach((segment) => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}

// Draw the food
function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, boxSize, boxSize);
}

// Update the game
function update() {
    const head = { ...snake[0] };

    // Update the head position based on the direction
    switch (direction) {
        case "UP":
            head.y -= boxSize;
            break;
        case "DOWN":
            head.y += boxSize;
            break;
        case "LEFT":
            head.x -= boxSize;
            break;
        case "RIGHT":
            head.x += boxSize;
            break;
    }

    // Check if the snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score++;
        food = {
            x: Math.floor((Math.random() * canvasSize) / boxSize) * boxSize,
            y: Math.floor((Math.random() * canvasSize) / boxSize) * boxSize,
        };
    } else {
        snake.pop();
    }

    // Check for collisions
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvasSize ||
        head.y >= canvasSize ||
        snake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
        alert("Game Over! Your score: " + score);
        document.location.reload();
    }

    snake.unshift(head);
}

// Draw everything on the canvas
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    drawSnake();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + score, 10, 20);
}

// Handle keyboard input
document.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

// Game loop
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

gameLoop();
