import {Position} from "./Position";
import {Force} from "./Force";
import {Physics} from "./Physics";
import {Velocity} from "./Velocity";

export class Body {
    public mass: number;
    public velocity: Velocity;
    public position: Position;

    constructor (x: number, y: number, mass: number) {
        this.position = new Position(x, y);
        this.mass = mass;
    }

    exert (force: Force, time: number) {
        //todo clone vector value
        //todo set amount as force.amount * time / this.mass;
        //todo add this.velocity
    }

    static gravityForceBetween(first: Body, second: Body) {
        let distance = Position.distance(first.position, second.position);
        let direction = Position.direction(first.position, second.position);
        let amount = Physics.G * (first.mass * second.mass / Math.pow(distance, 2));
        return new Force(amount, direction);
    }
}
