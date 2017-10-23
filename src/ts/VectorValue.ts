import {Position} from "./Position";

export class VectorValue extends Position {
    get amount () {
        return Position.distance(this);
    }

    set amount (val: number) {
        //TODO
    }

    get direction () {
        return Position.direction(this);
    }

    set direction (val: number) {
        //TODO
    }

    static net (first: VectorValue, second: VectorValue) {
         return new VectorValue(first.x + second.x, first.y + second.y);
    }
}