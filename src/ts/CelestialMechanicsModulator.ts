import {Body} from "./Body";
import {Force} from "./Force";

const EARTH_MASS = 5.9726e24;

export class CelestialMechanicsModulator {
    public bodies: Body[] = [];

    constructor() {
        this.bodies.push(new Body(9e8, 8.1e8, EARTH_MASS));
        this.bodies.push(new Body(4.5e8, 9e8, EARTH_MASS));
        this.bodies.push(new Body(7.5e8, 4.5e8, EARTH_MASS));
    }

    integrate(time: number) {
        this.bodies.forEach(body => {
            let gravityForce = this.getNetGravityForce(body);
            body.exert(gravityForce, time);
        });
        this.move(time);
    }

    private getNetGravityForce(body: Body): Force {
        let netForce = new Force();
        this.bodies.forEach(another => {
            if (another !== body) {
                Force.net(netForce, Body.gravityForceBetween(body, another))
            }
        });
        return netForce;
    }

    private move(time: number) {

    }
}
