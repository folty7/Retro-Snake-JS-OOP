//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var ctx;

class gameObject{
    //private atributes
    #x;
    #y;

    constructor(){
        this.#x = 0;
        this.#y = 0;
    }

    //public methods
    setX(x){
        return this.#x = x;
    }
    setY(y){
        return this.#y = y;
    }

    getX(){
        return this.#x;
    }
    getY(){
        return this.#y;
    }

}

//snake
class snake extends gameObject{
    //public atributes
    velocityX = 0;
    velocityY = 0;
    color = '';
    body = [];

    //private atributes
    #x;
    #y;

    constructor(x, y, color){
        super();
        this.#x = this.setX(x);
        this.#y = this.setY(y);
        this.color = color;
    }

    //public methods
    setX(x){
        return this.#x = x;
    }
    setY(y){
        return this.#y = y;
    }

    getX(){
        return this.#x;
    }
    getY(){
        return this.#y;
    }
}

//food
class food extends gameObject{
    //private
    #x;
    #y;
    constructor(){
        super();
        // Math.random vracia cislo 0-1
        // Math.floor zaokruhli na cele cislo
        // nasobime cols = 0-19
        // nasobime blockSize
        this.#x = Math.floor(Math.random() * cols) * blockSize;     //konstruktor s random spawnom jedla
        this.#y = Math.floor(Math.random() * rows) * blockSize;
    }

    //public
    setX(x){
        return this.#x = x;
    }
    setY(y){
        return this.#y = y;
    }

    getX(){
        return this.#x;
    }
    getY(){
        return this.#y;
    }

    colision(snake, snakeGrow){
        if (snake.getX() == this.getX() && snake.getY() == this.getY()){
            this.setX(Math.floor(Math.random() * cols) * blockSize);
            this.setY(Math.floor(Math.random() * rows) * blockSize);
            snakeGrow.push([this.getX(), this.getY()]);
        }
    }
}


//game
window.onload = function() {
    board = document.getElementById('board');
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    ctx = board.getContext('2d');
    gameOver = false;

    snake = new snake(blockSize * 5, blockSize * 5, 'blue');        //lokacia spawnu hada
    food = new food();

    while (gameOver == false){
        document.addEventListener('keyup', changeDir);
        setInterval(update, 1000/10);       //10fps (1000ms/10fps = 100ms)
    }
}


function update() {
    //board render
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, board.width, board.height);

    //food render
    ctx.fillStyle = 'red';
    ctx.fillRect(food.getX(), food.getY(), blockSize, blockSize);

    food.colision(snake, snake.body);

    for (let i = snake.body.length-1; i > 0; i--) {
        snake.body[i] = snake.body[i-1];
    }
    if (snake.body.length){
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

    //game over conditions
    if (snake.getX() < 0 || snake.getX() > board.width || snake.getY() < 0 || snake.getY() >= board.height){
        gameOver = true;
        alert("Game Over");
    }
    for (let i = 0; i < snake.body.length; i++) {
        if (snake.getX() == snake.body[i][0] && snake.getY() == snake.body[i][1]){
            gameOver = true;
            alert("Game Over");
        }
    }
}

function changeDir(event){
    if (event.code == 'ArrowUp' && snake.velocityY != 1){
        snake.velocityX = 0;
        snake.velocityY = -1;
    }
    else if (event.code == 'ArrowDown' && snake.velocityY != -1){
        snake.velocityX = 0;
        snake.velocityY = 1;
    }
    else if (event.code == 'ArrowLeft' && snake.velocityX != 1){
        snake.velocityX = -1;
        snake.velocityY = 0;
    }
    else if (event.code == 'ArrowRight' && snake.velocityX != -1){
        snake.velocityX = 1;
        snake.velocityY = 0;
    }
}