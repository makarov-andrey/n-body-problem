import {RadiusVector} from "./RadiusVector";
import {Acceleration} from "./Acceleration";

/**
 * Инстансы этого класса олицетворяют собой силы, которые можно приложить к телам для придания им ускорения
 */
export class Force extends RadiusVector {
    /**
     * Выводит ускорение из силы на основе массы
     *
     * @param {number} mass
     * @returns {Acceleration}
     */
    getAcceleration(mass: number) {
        let acceleration = new Acceleration(this.x, this.y);
        acceleration.setAmount(this.getAmount() / mass);
        return acceleration;
    }
}