export class gameObject{
    constructor(){
        this.#x = 0;
        this.#y = 0;
    }

    //private atributes
    #x;
    #y;

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