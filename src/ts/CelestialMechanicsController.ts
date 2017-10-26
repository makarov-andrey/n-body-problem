import {CelestialMechanicsSimulator} from "./CelestialMechanicsSimulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";

export class CelestialMechanicsController {
    public integrationStep: number = 30 / 1000;
    protected started = false;

    constructor (
        public simulator: CelestialMechanicsSimulator,
        public renderer: CelestialMechanicsRenderer,
    ) {}

    start () {
        this.started = true;
        this.asynchronousRecursiveIntegration();
        this.asynchronousRecursiveRender();
    }

    asynchronousRecursiveRender() {
        this.renderer.render();
        this.waitForAnimationFrame().then(() => {
            if (this.started) {
                this.asynchronousRecursiveRender();
            }
        });
    }

    asynchronousRecursiveIntegration() {
        this.simulator.integrate(this.integrationStep);
        this.waitForIntegrationDelay().then(() => {
            if (this.started) {
                this.asynchronousRecursiveIntegration();
            }
        });
    }

    pause () {
        this.started = false;
    }

    waitForAnimationFrame () {
        return new Promise(resolve => requestAnimationFrame(resolve));
    }

    waitForIntegrationDelay () {
        return new Promise(resolve => setTimeout(resolve, this.integrationStep * 1000));
    }
}