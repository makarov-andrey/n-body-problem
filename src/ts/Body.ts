import {Coordinates} from "./Coordinates";
import {Force} from "./Force";

export class Body {
    public mass: number;
    public impulse: Force;
    public position: Coordinates;

    constructor (x: number, y: number, mass: number) {
        this.position = new Coordinates(x, y);
        this.impulse = new Force();
        this.mass = mass;
    }
}
