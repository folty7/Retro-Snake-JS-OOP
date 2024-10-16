import {Food} from "./food.js";

export class RedBull extends Food{
    constructor(rows, cols, blockSize){
        super(rows, cols, blockSize);
        this.#x = Math.floor(Math.random() * cols) * blockSize;     //konstruktor s random spawnom jedla
        this.#y = Math.floor(Math.random() * rows) * blockSize;

        this.#image = new Image(50, 50);
        this.#image.src = "./includes/img/redbull.png";
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

    // RedBull effect
    // po vypiti zmyznu 3 plamene
    eat(fire){
        fire.pop();
    }
}