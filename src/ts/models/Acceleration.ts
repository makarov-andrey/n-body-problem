import {VectorValue} from "./VectorValue";
import {Velocity} from "./Velocity";

/**
 * Инстанс этого класса представляет собой ускорение объекта.
 * Т.е. подразумевается дважды дифференцированный по времени радиус-вектор.
 */
export class Acceleration extends VectorValue {
    /**
     * Интегрирует по времени ускорение - возвращает объект Velocity, представляющий собой разницу скоростей
     *
     * @param {number} time
     * @returns {Velocity}
     */
    integrate (time: number) {
        let velocity = new Velocity(this.x, this.y);
        velocity.setModuloValue(this.getModuloValue() * time);
        return velocity;
    }
}