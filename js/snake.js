import {gameObject} from './gameObject.js';

export class Snake extends gameObject{
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
