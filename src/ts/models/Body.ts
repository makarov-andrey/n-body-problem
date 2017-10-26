import {Physics} from "../modules/Physics";
import {Position} from "./Position";
import {Velocity} from "./Velocity";
import {Force} from "./Force";

/**
 * Физическое тело. Материальный объект, выраженный в виде материальной точки, имеющий массу, скорость и позицию
 * в момент времени.
 */
export class Body {
    /**
     * Масса тела
     */
    public mass: number;

    /**
     * скорость тела в момент времени
     */
    public velocity: Velocity = new Velocity();

    /**
     * Позиция тела в момент времени
     */
    public position: Position = new Position();

    /**
     * Цвет для отрисовки
     */
    public color: string;

    /**
     * Применить силу в течении времени
     *
     * @param {Force} force
     * @param {number} time
     */
    exert (force: Force, time: number) {
        let acceleration = force.getAcceleration(this.mass);
        this.velocity.accelerate(acceleration, time);
    }

    /**
     * Двигает свою позицию в соответствии со своей скоростью за промежуток времени
     *
     * @param {number} time
     */
    move (time: number) {
        this.position.move(this.velocity, time);
    }

    /**
     * Вычисляет и возвращает силу притяжения между собой и другим телом
     *
     * @param {Body} another
     * @returns {Force}
     */
    gravityForce(another: Body) {
        let result = new Force();
        let distance = this.position.getDistance(another.position);
        result.setAmount(Physics.G * (this.mass * another.mass / Math.pow(distance, 2)));
        result.setDirection(this.position.getDirection(another.position));
        return result;
    }
}
