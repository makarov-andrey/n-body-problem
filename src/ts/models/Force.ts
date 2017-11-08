import {VectorValue} from "./VectorValue";
import {Acceleration} from "./Acceleration";

/**
 * Инстанс этого класса олицетворяет собой силу, которую можно приложить к телу для придания ему ускорения
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