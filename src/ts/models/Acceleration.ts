import {RadiusVector} from "./RadiusVector";
import {Velocity} from "./Velocity";

/**
 * Инстансы этого класса представляют собой ускорение объекта.
 * Т.е. подразумевается дважды дифференцированный по времени радиус-вектор.
 */
export class Acceleration extends RadiusVector {
    /**
     * Интегрирует по времени ускорение - возвращает объект Velocity, представляющий собой разницу скоростей
     *
     * @param {number} time
     * @returns {Velocity}
     */
    integrate (time: number) {
        let velocity = new Velocity(this.x, this.y);
        velocity.setAmount(this.getAmount() * time);
        return velocity;
    }
}