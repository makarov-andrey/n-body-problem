import {CelestialMechanicsSimulator} from "./CelestialMechanicsSimulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";
import {Body} from "./models/Body";
import {BodyControlsAccessor} from "./BodyControlsAccessor";

export class CelestialMechanicsController {
    public integrationStep: number = 1 / 10000;
    protected started = false;
    protected bodyControlsAccessors: BodyControlsAccessor[] = [];
    protected simulator: CelestialMechanicsSimulator;
    protected renderer: CelestialMechanicsRenderer;
    protected previousIntegrationTimestamp: number;

    public niceColors = [
        "#900",
        "#090",
        "#009",
        "#990",
        "#909",
        "#099",
        "#999",
    ];

    constructor (
        public spaceElement: HTMLElement,
        public controlsElement: HTMLElement,
    ) {
        this.simulator = new CelestialMechanicsSimulator();
        this.renderer = new CelestialMechanicsRenderer(this.spaceElement, this.simulator);
        this.createBodies();
        this.createControls();
        this.renderer.render();
    }

    reset () {
        this.synchroniseBodiesAccessors();
        this.renderer.reset();
    }

    applyControlsValues () {
        this.bodyControlsAccessors.forEach(accessor => accessor.apply());
        this.renderer.reset();
    }

    setInitialValuesForBodies () {
        this.simulator.bodies.forEach(body => body.mass = 2.75002e35);
        let scale = 3e8;
        let offsetX = scale * 2;
        let offsetY = scale * 2;
        let p1 = 0.392955;
        let p2 = 0.097579;

        this.simulator.bodies[0].position.x = -1 * scale + offsetX;
        this.simulator.bodies[0].position.y = offsetY;
        this.simulator.bodies[0].velocity.x = p1 * scale;
        this.simulator.bodies[0].velocity.y = p2 * scale;

        this.simulator.bodies[1].position.x = scale + offsetX;
        this.simulator.bodies[1].position.y = offsetY;
        this.simulator.bodies[1].velocity.x = p1 * scale;
        this.simulator.bodies[1].velocity.y = p2 * scale;

        this.simulator.bodies[2].position.x = offsetX;
        this.simulator.bodies[2].position.y = offsetY;
        this.simulator.bodies[2].velocity.x = -2 * p1 * scale;
        this.simulator.bodies[2].velocity.y = -2 * p2 * scale;
    }

    setRandomValuesForBodies () {
        function rand(min: number, max: number) {
            return Math.random() * (max - min) + min;
        }

        this.simulator.bodies[0].position.x = 9e8;
        this.simulator.bodies[0].position.y = 8.1e8;

        this.simulator.bodies[1].position.x = 4.5e8;
        this.simulator.bodies[1].position.y = 9e8;

        this.simulator.bodies[2].position.x = 7.5e8;
        this.simulator.bodies[2].position.y = 4.5e8;

        this.simulator.bodies.forEach(body => {
            body.mass = rand(1e35, 1e36);
            body.velocity.setModuloValue(rand(1e7, 1e8));
        });

        this.simulator.bodies[0].velocity.setDirection(rand(Math.PI, Math.PI * 1.5));
        this.simulator.bodies[1].velocity.setDirection(rand(Math.PI * 1.5, Math.PI * 2));
        this.simulator.bodies[2].velocity.setDirection(rand(Math.PI  / 2, Math.PI));
    }

    start () {
        if (this.started) {
            return;
        }
        this.started = true;
        this.previousIntegrationTimestamp = Date.now();
        this.asynchronousRecursiveRender();
    }

    pause () {
        this.started = false;
    }

    private createBodies () {
        for (let i = 0; i < 3; i++) {
            this.simulator.bodies[i] = new Body();
            this.simulator.bodies[i].color = this.niceColors.shift() || "#000";
        }
        this.setInitialValuesForBodies();
    }

    private createControls () {
        this.simulator.bodies.forEach((body, i) => {
            let bodyControlsAccessor = new BodyControlsAccessor(body, `Тело  ${i + 1}`);
            this.bodyControlsAccessors.push(bodyControlsAccessor);
            this.controlsElement.appendChild(bodyControlsAccessor.boxElement);
        });

        let stopButton = document.createElement("button");
        stopButton.innerHTML = "Pause";
        stopButton.addEventListener("click", () => this.pause());
        this.controlsElement.appendChild(stopButton);

        let startButton = document.createElement("button");
        startButton.innerHTML = "Start";
        startButton.addEventListener("click", () => this.start());
        this.controlsElement.appendChild(startButton);

        let applyButton = document.createElement("button");
        applyButton.innerHTML = "Apply";
        applyButton.addEventListener("click", () => this.applyControlsValues());
        this.controlsElement.appendChild(applyButton);

        let resetButton = document.createElement("button");
        resetButton.innerHTML = "Reset";
        resetButton.addEventListener("click", () => {
            this.setInitialValuesForBodies();
            this.reset();
        });
        this.controlsElement.appendChild(resetButton);

        let randomButton = document.createElement("button");
        randomButton.innerHTML = "Random";
        randomButton.addEventListener("click", () => {
            this.setRandomValuesForBodies();
            this.reset();
        });
        this.controlsElement.appendChild(randomButton);
    }

    private synchroniseBodiesAccessors( ) {
        this.bodyControlsAccessors.forEach(accessor => accessor.synchronise());
    }

    private asynchronousRecursiveRender() {
        if (!this.started) {
            return;
        }
        let now = Date.now();
        while (this.previousIntegrationTimestamp < now) {
            this.simulator.integrate(this.integrationStep);
            this.renderer.renderEfficiently();
            this.previousIntegrationTimestamp += this.integrationStep * 1000;
        }
        this.synchroniseBodiesAccessors();
        this.waitForAnimationFrame().then(() => this.asynchronousRecursiveRender());
    }

    private waitForAnimationFrame () {
        return new Promise(resolve => requestAnimationFrame(resolve));
    }
}