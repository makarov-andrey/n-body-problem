import {RadiusVector} from "./RadiusVector";
import {Acceleration} from "./Acceleration";

export class Force extends RadiusVector {
    getAcceleration(mass: number) {
        let acceleration = new Acceleration(this.x, this.y);
        acceleration.setAmount(this.getAmount() / mass);
        return acceleration;
    }
}