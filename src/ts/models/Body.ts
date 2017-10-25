import {Physics} from "../modules/Physics";
import {Position} from "./Position";
import {Velocity} from "./Velocity";
import {Force} from "./Force";

export class Body {
    public mass: number;
    public velocity: Velocity;
    public position: Position;

    constructor () {
        this.position = new Position();
        this.velocity = new Velocity();
    }

    exert (force: Force, time: number) {
        let acceleration = force.getAcceleration(this.mass);
        this.velocity.accelerate(acceleration, time);
    }

    move (time: number) {
        this.position.move(this.velocity, time);
    }

    gravityForce(another: Body) {
        let result = new Force();
        let distance = this.position.getDistance(another.position);
        result.setAmount(Physics.G * (this.mass * another.mass / Math.pow(distance, 2)));
        result.setDirection(this.position.getDirection(another.position));
        return result;
    }
}
