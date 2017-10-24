import {Body} from "./models/Body";
import {Force} from "./models/Force";

const EARTH_MASS = 6e34;

export class CelestialMechanicsModulator {
    public bodies: Body[] = [];

    constructor() {
        this.bodies.push(new Body(9e8, 8.1e8, EARTH_MASS));
        this.bodies.push(new Body(4.5e8, 9e8, EARTH_MASS));
        this.bodies.push(new Body(7.5e8, 4.5e8, EARTH_MASS));
    }

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
