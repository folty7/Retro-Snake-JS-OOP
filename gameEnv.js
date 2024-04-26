import {Snake} from './js/snake.js';
import {Food} from './js/food.js';
import {Fire} from './js/fire.js';
import {RedBull} from './js/redbull.js';

//board
var blockSize = 25;
var rows = 18;
var cols = 18;
var board;
var ctx;
var gameInterval;
var score = 0;
var scoreElement;
var snake;
var food = [];
var fires = [];
var bestScore = 0;
var bestScoreElement;
var redbulls = [];
var level = 1;
var levelElement;

window.onload = function () {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    ctx = board.getContext('2d');
    scoreElement = document.getElementById('score');
    scoreElement.innerText = score;
    bestScoreElement = document.getElementById('bestScore');
    bestScoreElement.innerText = bestScore;
    levelElement = document.getElementById('level');
    levelElement.innerText = level;


    snake = new Snake(blockSize * 5, blockSize * 5, '#F700FFFF');        //lokacia spawnu hada
    food.push(new Food(rows, cols, blockSize));

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
    food.map((oneFood) => {
        var foodImg = new Image();
        foodImg.src = oneFood.getImage();
        ctx.drawImage(foodImg, oneFood.getX(), oneFood.getY(), blockSize, blockSize);
    });
    //fire render
    fires.map((fire) => {
        var fireImg = new Image();
        fireImg.src = fire.getImage();
        ctx.drawImage(fireImg, fire.getX(), fire.getY(), blockSize, blockSize);
    });
    //redbull render
    redbulls.map((redbull) => {
        var redbullImg = new Image();
        redbullImg.src = redbull.getImage();
        ctx.drawImage(redbullImg, redbull.getX(), redbull.getY(), blockSize, blockSize);
    });

    if (score >= 5){
        level = 2;
        levelElement.innerText = level;
    } else if (score >= 10){
        level = 3;
        levelElement.innerText = level;
    }

    //kolizia hada s jedlom
    food.map((oneFood, index) => {
        if (snake.getX() == oneFood.getX() && snake.getY() == oneFood.getY()) {
            snake.body.push([oneFood.getX(), oneFood.getY()]);
            food.splice(index, 1); // Remove the Food object that the snake collided with
            newFood();
            score++;
            scoreElement.innerText = snake.body.length;
            newFire()
            newRedBull();
        }
    });

    //kolizia hada s redbullom
    redbulls.map((redbull, index) => {
        if (snake.getX() == redbull.getX() && snake.getY() == redbull.getY()) {
            redbull.drink(fires);
            redbulls.splice(index, 1); // Remove the RedBull object that the snake collided with
            snake.body.push([redbull.getX(), redbull.getY()]);
            score++;
            scoreElement.innerText = snake.body.length;
        }
    });

    //snake body movement
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
    // out of bounds
    if (snake.getX() < 0 || snake.getX() >= board.width || snake.getY() < 0 || snake.getY() >= board.height) {
        alert("GAME OVER! \n" +
            "Tvoje skóre je: " + snake.body.length + "\n" +
            "Pre spustenie novej hry stlač OK'");
        restartGame(); // Restart the game
        return; // Exit update function to prevent further processing
    }
    // collision with self
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.getX() == snake.body[i][0] && snake.getY() == snake.body[i][1]) {
            alert("GAME OVER! \n" +
                "Tvoje skóre je: " + snake.body.length + "\n" +
                "Pre spustenie novej hry stlač OK'");
            restartGame(); // Restart the game
            return; // Exit update function to prevent further processing
        }
    }
    //kolizia hada s ohnom
    fires.map((fire, index) => {
        if (snake.getX() == fire.getX() && snake.getY() == fire.getY()) {
            alert("GAME OVER! \n" +
                "Tvoje skóre je: " + snake.body.length + "\n" +
                "Pre spustenie novej hry stlač OK'");
            restartGame(); // Restart the game
            return; // Exit update function to prevent further processing
        }
    });
}

function restartGame() {
    clearInterval(gameInterval); // Stop the current game interval

    // Check the score before resetting the snake
    if (snake.body.length > bestScore) {
        bestScore = snake.body.length;
        bestScoreElement.innerText = bestScore;
    }

    // Reset snake position and body size
    snake.setX(blockSize * 5);
    snake.setY(blockSize * 5);
    snake.velocityX = 0;
    snake.velocityY = 0;
    snake.body = [];
    food = [];
    fires = [];
    redbulls = [];
    level = 1;
    levelElement.innerText = level;
    score = 0;
    scoreElement.innerText = score;

    // Reset food position
    newFood();

    // Start a new game interval
    gameInterval = setInterval(update, 1000 / 10);
}

function newFood() {
    food.push(new Food(rows, cols, blockSize));
}

function newFire() {
    fires.push(new Fire(rows, cols, blockSize));
}

function newRedBull() {
    redbulls.push(new RedBull(rows, cols, blockSize));
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