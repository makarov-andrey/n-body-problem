import {Body} from "./models/Body";
import {Force} from "./models/Force";

export class CelestialMechanicsSimulator {
    public bodies: Body[] = [];

    /**
     * Метод интегрирует систему по времени. Т.е. вычисляет действие силы на каждый объект системы за заданный прошедший
     * промежуток времени и двигает тела системы в соответствии с их импульсами.
     *
     * @param {number} time
     */
    integrate(time: number) {
        let gravityForcesForBodies: Map<Body, Force> = new Map();
        this.bodies.forEach(body => {
            gravityForcesForBodies.set(body, this.netGravityForceFor(body));
        });
        this.bodies.forEach(body => {
            body.exert(gravityForcesForBodies.get(body), time);
            body.move(time);
        });
    }

    /**
     * Метод вычисляет равнодействующую сил притяжения всех объектов системы на тело
     *
     * @param {Body} body
     * @returns {Force}
     */
    netGravityForceFor(body: Body) {
        let netForce = new Force();
        this.bodies.forEach(another => {
            if (another !== body) {
                netForce.add(body.gravityForce(another))
            }
        });
        return netForce;
    }
}
