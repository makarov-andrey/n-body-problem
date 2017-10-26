import {RadiusVector} from "./RadiusVector";
import {Velocity} from "./Velocity";

/**
 * Инстансы этого класса представляют собой позицию объекта относительно точки отсчета, т.е. радиус-вектор.
 */
export class Position extends RadiusVector {
    /**
     * Изменяет себя, добавив к себе интегрированную по времени скорость (т.е. разницу в позициях)
     *
     * @param {Velocity} velocity
     * @param {number} time
     */
    move (velocity: Velocity, time: number) {
        this.add(velocity.integrate(time));
    }
}