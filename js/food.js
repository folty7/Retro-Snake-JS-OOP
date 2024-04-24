import {gameObject} from "./gameObject.js";

export class Food extends gameObject{
    //private
    #x;
    #y;
    #image;
    constructor(rows, cols, blockSize){
        super();
        // Math.random vracia cislo 0-1
        // Math.floor zaokruhli na cele cislo
        // nasobime cols = 0-19
        // nasobime blockSize
        this.#x = Math.floor(Math.random() * cols) * blockSize;     //konstruktor s random spawnom jedla
        this.#y = Math.floor(Math.random() * rows) * blockSize;

        this.#image = new Image(50, 50);
        this.#image.src = "./includes/img/apple.png";
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
    getImage(){
        return this.#image.src;
    }
}
