import {Body} from "./models/Body";
import {Force} from "./models/Force";

export class CelestialMechanicsModulator {
    public bodies: Body[] = [];

    constructor() {
        this.bodies[0] = new Body();
        this.bodies[1] = new Body();
        this.bodies[2] = new Body();
        this.butterfly();
    }

    butterfly() {
        this.bodies.forEach(body => body.mass = 2.05e35);
        let scale = 3e8;
        let offsetX = scale * 2;
        let offsetY = scale * 2;
        let p1 = 0.392955;
        let p2 = 0.097579;

        this.bodies[0].position.x = -1 * scale + offsetX;
        this.bodies[0].position.y = offsetY;
        this.bodies[0].velocity.x = p1 * scale;
        this.bodies[0].velocity.y = p2 * scale;

        this.bodies[1].position.x = scale + offsetX;
        this.bodies[1].position.y = offsetY;
        this.bodies[1].velocity.x = p1 * scale;
        this.bodies[1].velocity.y = p2 * scale;

        this.bodies[2].position.x = offsetX;
        this.bodies[2].position.y = offsetY;
        this.bodies[2].velocity.x = -2 * p1 * scale;
        this.bodies[2].velocity.y = -2 * p2 * scale;
    }

    setRandomValues () {
        function rand(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        this.bodies[0].position.x = 9e8;
        this.bodies[0].position.y = 8.1e8;

        this.bodies[1].position.x = 4.5e8;
        this.bodies[1].position.y = 9e8;

        this.bodies[2].position.x = 7.5e8;
        this.bodies[2].position.y = 4.5e8;

        this.bodies.forEach(body => {
            body.mass = rand(1e30, 1e31);
            body.velocity.setAmount(rand(1e7, 1e8));
        });

        this.bodies[0].velocity.setDirection(rand(Math.PI, Math.PI * 1.5));
        this.bodies[1].velocity.setDirection(rand(Math.PI * 1.5, Math.PI * 2));
        this.bodies[2].velocity.setDirection(rand(Math.PI  / 2, Math.PI));
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
