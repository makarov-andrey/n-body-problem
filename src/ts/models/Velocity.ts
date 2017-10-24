import {RadiusVector} from "./RadiusVector";
import {Acceleration} from "./Acceleration";
import {Position} from "./Position";

export class Velocity extends RadiusVector {
    accelerate (acceleration: Acceleration, time: number) {
        this.add(acceleration.integrate(time));
    }

    integrate (time: number) {
        let position = new Position(this.x, this.y);
        position.setAmount(this.getAmount() * time);
        return position;
    }
}