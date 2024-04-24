export class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Metóda pre zistenie kolízie s iným objektom
    collidesWith(otherObject) {
        return this.x === otherObject.x && this.y === otherObject.y;
    }
}