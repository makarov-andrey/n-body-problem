import {RadiusVector} from "./RadiusVector";
import {Velocity} from "./Velocity";

export class Acceleration extends RadiusVector {
    integrate (time: number) {
        let velocity = new Velocity(this.x, this.y);
        velocity.setAmount(this.getAmount() * time);
        return velocity;
    }
}