import {VectorValue} from "./VectorValue";
import {Acceleration} from "./Acceleration";

/**
 * Инстансы этого класса олицетворяют собой силы, которые можно приложить к телам для придания им ускорения
 */
export class Force extends VectorValue {
    /**
     * Выводит ускорение из силы на основе массы
     *
     * @param {number} mass
     * @returns {Acceleration}
     */
    getAcceleration(mass: number) {
        let acceleration = new Acceleration(this.x, this.y);
        acceleration.setModuloValue(this.getModuloValue() / mass);
        return acceleration;
    }
}