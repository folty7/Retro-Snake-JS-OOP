export class gameObject{
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