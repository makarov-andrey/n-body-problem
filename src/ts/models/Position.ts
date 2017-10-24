import {RadiusVector} from "./RadiusVector";
import {Velocity} from "./Velocity";

export class Position extends RadiusVector {
    move (velocity: Velocity, time: number) {
        this.add(velocity.integrate(time));
    }
}