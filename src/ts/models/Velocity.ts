import {VectorValue} from "./VectorValue";
import {Acceleration} from "./Acceleration";
import {Position} from "./Position";

/**
 * Инстансы этого класса представляют собой скорость объекта.
 * Т.е. подразумевается единожды дифференцированный по времени радиус-вектор.
 */
export class Velocity extends VectorValue {
    /**
     * Изменяет себя, добавив к себе интегрированное по времени ускорение (т.е. разницу в скоростях)
     *
     * @param {Acceleration} acceleration
     * @param {number} time
     */
    accelerate (acceleration: Acceleration, time: number) {
        this.add(acceleration.integrate(time));
    }

    /**
     * Интегрирует по времени скорость - возвращает объект Position, представляющий собой разницу позиций
     *
     * @param {number} time
     * @returns {Position}
     */
    integrate (time: number) {
        let position = new Position(this.x, this.y);
        position.setDistance(this.getModuloValue() * time);
        return position;
    }
}