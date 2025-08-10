const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

let box = 20;
let snake = [{x: 9 * box, y: 10 * box}];
let direction;
let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};
let score = 0;
let wrapAround = false;
let themes = ["black", "#0f0", "#f0f"];
let themeIndex = 0;
let difficulties = [200, 120, 80];
let difficultyIndex = 0;
let game;

document.addEventListener("keydown", directionControl);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

function changeTheme() {
    themeIndex = (themeIndex + 1) % themes.length;
}

function changeDifficulty() {
    difficultyIndex = (difficultyIndex + 1) % difficulties.length;
    clearInterval(game);
    game = setInterval(draw, difficulties[difficultyIndex]);
}

function toggleWrap() {
    wrapAround = !wrapAround;
}

function draw() {
    ctx.fillStyle = themes[themeIndex];
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "white" : "lightgreen";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    if (wrapAround) {
        if (snakeX < 0) snakeX = canvas.width - box;
        else if (snakeX >= canvas.width) snakeX = 0;
        if (snakeY < 0) snakeY = canvas.height - box;
        else if (snakeY >= canvas.height) snakeY = 0;
    } else {
        if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
            clearInterval(game);
            alert("Game Over! Score: " + score);
            return;
        }
    }

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = {x: snakeX, y: snakeY};

    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            clearInterval(game);
            alert("Game Over! Score: " + score);
            return;
        }
    }

    snake.unshift(newHead);
}

game = setInterval(draw, difficulties[difficultyIndex]);