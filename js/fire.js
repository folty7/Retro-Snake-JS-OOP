import {RedBull} from "./redbull.js";

export class Fire extends RedBull{
    constructor(rows, cols, blockSize){
        super(rows, cols, blockSize);
        this.#x = Math.floor(Math.random() * cols) * blockSize;     //konstruktor s random spawnom jedla
        this.#y = Math.floor(Math.random() * rows) * blockSize;

        this.#image = new Image(50, 50);
        this.#image.src = "./includes/img/fire.png";
    }
    //private
    #x;
    #y;
    #image;

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
    getImage(){
        return this.#image.src;
    }

    // ak had zje plamen, zmyznu 2 casti tela
    // polymorfizmus, pretoze dedi metodu od RedBull a premaha ju na iny efekt
    eat(snake){
        if (snake.body.length > 1) {
            snake.body.pop();
            snake.body.pop();
            return true;
        }
        return false;
    }
}