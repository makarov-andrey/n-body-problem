import {Coordinates} from "./Coordinates";
import {Force} from "./Force";
import {Physics} from "./Physics";
import {Velocity} from "./Velocity";

export class Body {
    public mass: number;
    public velocity: Velocity;
    public position: Coordinates;

    constructor (x: number, y: number, mass: number) {
        this.position = new Coordinates(x, y);
        this.mass = mass;
    }

    force (force: Force) {

    }

    static getGravityForce(first: Body, second: Body) {
        let distance = Coordinates.distance(first.position, second.position);
        let direction = Coordinates.direction(first.position, second.position);
        let amount = Physics.G * (first.mass * second.mass / Math.pow(distance, 2));
        return new Force(amount, direction);
    }
}
