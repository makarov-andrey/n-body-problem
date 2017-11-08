import {CelestialMechanicsSimulator} from "./CelestialMechanicsSimulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";
import {Body} from "./models/Body";
import {BodyControlsAccessor} from "./BodyControlsAccessor";
import * as utilities from "./Utilities";

export class CelestialMechanicsController {
    public integrationStep: number = 1 / 100000;
    public minFPS: number = 30;
    public timeScale: number = 1;
    public niceColors = [
        "#900",
        "#090",
        "#009",
        "#990",
        "#909",
        "#099",
        "#999",
    ];

    public readonly simulator: CelestialMechanicsSimulator;
    public readonly renderer: CelestialMechanicsRenderer;

    private started = false;
    private bodyControlsAccessors: BodyControlsAccessor[] = [];
    private previousIntegrationTimestamp: number = Date.now();
    private realTimeScale: number;

    constructor (
        public spaceElement: HTMLElement,
        public controlsElement: HTMLElement,
    ) {
        this.realTimeScale = this.timeScale;
        this.simulator = new CelestialMechanicsSimulator();
        this.renderer = new CelestialMechanicsRenderer(this.spaceElement, this.simulator);
        this.createBodies();
        this.createControls();
        this.renderer.render();
    }

    reset () {
        this.synchroniseControls();
        this.renderer.reset();
    }

    applyControlsValues () {
        this.bodyControlsAccessors.forEach(accessor => accessor.apply());
        this.renderer.reset();
    }

    setInitialValuesForBodies () {
        this.simulator.bodies.forEach(body => body.mass = 2e35);
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

    solarSystemModulation () {
        let sun = this.simulator.bodies[0];
        let earth = this.simulator.bodies[1];

        sun.mass = 1.98892e30;
        sun.position.x = 3e11;
        sun.position.y = 3e11;
        sun.velocity.x = 0;
        sun.velocity.y = 0;

        earth.mass = 5.9726e24;
        earth.position.x = sun.position.x + 149597870700;
        earth.position.y = sun.position.y;
        earth.velocity.y = 0;
        earth.velocity.x = 30000;


        this.integrationStep = 5;
        this.timeScale = 525600;
        this.renderer.scale = 1.5e9;
    }

    setRandomValuesForBodies () {
        this.simulator.bodies[0].position.x = 9e8;
        this.simulator.bodies[0].position.y = 8.1e8;

        this.simulator.bodies[1].position.x = 4.5e8;
        this.simulator.bodies[1].position.y = 9e8;

        this.simulator.bodies[2].position.x = 7.5e8;
        this.simulator.bodies[2].position.y = 4.5e8;

        this.simulator.bodies.forEach(body => {
            body.mass = utilities.rand(1e35, 1e36);
            body.velocity.setModuloValue(utilities.rand(1e7, 1e8));
        });

        this.simulator.bodies[0].velocity.setDirection(utilities.rand(Math.PI, Math.PI * 1.5));
        this.simulator.bodies[1].velocity.setDirection(utilities.rand(Math.PI * 1.5, Math.PI * 2));
        this.simulator.bodies[2].velocity.setDirection(utilities.rand(Math.PI  / 2, Math.PI));
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

        let stopButton = utilities.createElementFromHtml(`<button>Pause</button>`);
        stopButton.addEventListener("click", () => this.pause());
        this.controlsElement.appendChild(stopButton);

        let startButton = utilities.createElementFromHtml(`<button>Start</button>`);
        startButton.addEventListener("click", () => this.start());
        this.controlsElement.appendChild(startButton);

        let applyButton = utilities.createElementFromHtml(`<button>Apply</button>`);
        applyButton.addEventListener("click", () => this.applyControlsValues());
        this.controlsElement.appendChild(applyButton);

        let resetButton = utilities.createElementFromHtml(`<button>Reset</button>`);
        resetButton.addEventListener("click", () => {
            this.setInitialValuesForBodies();
            this.reset();
        });
        this.controlsElement.appendChild(resetButton);

        let randomButton = utilities.createElementFromHtml(`<button>Random</button>`);
        randomButton.addEventListener("click", () => {
            this.setRandomValuesForBodies();
            this.reset();
        });
        this.controlsElement.appendChild(randomButton);

        let timeScaleWarning = utilities.createElementFromHtml(`
            <div id="time-slowed-warning" class="warning" style="display: none;">
                Время замедлено на <span id="time-slowed-value"></span>%
            </div>
        `);
        this.controlsElement.appendChild(timeScaleWarning);
    }

    private synchroniseControls( ) {
        this.bodyControlsAccessors.forEach(accessor => accessor.synchronise());
        if (this.realTimeScale < this.timeScale) {
            document.getElementById('time-slowed-warning').style.display = 'block';
            document.getElementById('time-slowed-value').innerHTML = Math.round((this.timeScale - this.realTimeScale) / this.timeScale * 100).toString();
        } else {
            document.getElementById('time-slowed-warning').style.display = 'none';
        }
    }

    private asynchronousRecursiveRender() {
        if (!this.started) {
            return;
        }
        let now = Date.now(),
            difference = now - this.previousIntegrationTimestamp,
            maxFrameRenderingTime = 1000 / this.minFPS;

        this.realTimeScale *= maxFrameRenderingTime / difference;
        if (this.realTimeScale > this.timeScale) {
            this.realTimeScale = this.timeScale;
        }

        while (this.previousIntegrationTimestamp < now) {
            this.simulator.integrate(this.integrationStep);
            this.renderer.renderEfficiently();
            this.previousIntegrationTimestamp += this.integrationStep * 1000 / this.realTimeScale;
        }

        this.synchroniseControls();

        this.waitForAnimationFrame().then(() => this.asynchronousRecursiveRender());
    }

    private waitForAnimationFrame () {
        return new Promise(resolve => requestAnimationFrame(resolve));
    }
}