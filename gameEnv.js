import {Snake} from './js/snake.js';
import {Food} from './js/food.js';

//board
var blockSize = 25;
var rows = 20;
var cols = 25;
var board;
var ctx;
var gameInterval;
var score;
var snake;
var food;

window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    ctx = board.getContext('2d');
    score = document.getElementById('score');

    snake = new Snake(blockSize * 5, blockSize * 5, '#F700FFFF');        //lokacia spawnu hada
    food = new Food(rows, cols, blockSize);

    document.addEventListener('keyup', changeDir);
    gameInterval = setInterval(update, 1000 / 10);       //10fps (1000ms/10fps = 100ms)
}

function update() {
    //board render
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, board.width, board.height);

    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 0.1;

    // Draw lines for each row and column
    for (let i = 0; i <= rows; i++) {
        for (let j = 0; j <= cols; j++) {
            ctx.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
        }
    }

    //food render
    var foodImg = new Image();
    foodImg.src = food.getImage();
    ctx.drawImage(foodImg, food.getX(), food.getY(), blockSize, blockSize);


    //kolizia jedna s hadom
    if (snake.getX() == food.getX() && snake.getY() == food.getY()) {
        snake.body.push([food.getX(), food.getY()]);
        newFood();
        score.innerText = snake.body.length;
    }

    for (let i = snake.body.length - 1; i > 0; i--) {
        snake.body[i] = snake.body[i - 1];
    }
    if (snake.body.length) {
        snake.body[0] = [snake.getX(), snake.getY()];
    }

    //snake render
    ctx.fillStyle = snake.color;
    snake.setX(snake.getX() + (snake.velocityX * blockSize));
    snake.setY(snake.getY() + (snake.velocityY * blockSize));
    ctx.fillRect(snake.getX(), snake.getY(), blockSize, blockSize);
    for (let i = 0; i < snake.body.length; i++) {
        ctx.fillRect(snake.body[i][0], snake.body[i][1], blockSize, blockSize);
    }

    // Check for game over conditions
    if (snake.getX() < 0 || snake.getX() >= board.width || snake.getY() < 0 || snake.getY() >= board.height) {
        alert("GAME OVER! \n" +
            "Tvoje skóre je: " + snake.body.length + "\n " +
            "Pre spustenie novej hry stlač OK'");
        restartGame(); // Restart the game
        return; // Exit update function to prevent further processing
    }
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.getX() == snake.body[i][0] && snake.getY() == snake.body[i][1]) {
            alert("Game Over");
            restartGame(); // Restart the game
            return; // Exit update function to prevent further processing
        }
    }
}

function restartGame() {
    clearInterval(gameInterval); // Stop the current game interval
    // Reset snake position and body size
    snake.setX(blockSize * 5);
    snake.setY(blockSize * 5);
    snake.velocityX = 0;
    snake.velocityY = 0;
    snake.body = [];
    score.innerText = 0;
    // Reset food position
    newFood();
    // Start a new game interval
    gameInterval = setInterval(update, 1000 / 10);
}

function newFood() {
    let food = new Food();
    food.setX(Math.floor(Math.random() * cols) * blockSize);
    food.setY(Math.floor(Math.random() * rows) * blockSize);
}

function changeDir(event) {
    if (event.code == 'ArrowUp' && snake.velocityY != 1) {
        snake.velocityX = 0;
        snake.velocityY = -1;
    } else if (event.code == 'ArrowDown' && snake.velocityY != -1) {
        snake.velocityX = 0;
        snake.velocityY = 1;
    } else if (event.code == 'ArrowLeft' && snake.velocityX != 1) {
        snake.velocityX = -1;
        snake.velocityY = 0;
    } else if (event.code == 'ArrowRight' && snake.velocityX != -1) {
        snake.velocityX = 1;
        snake.velocityY = 0;
    }
}