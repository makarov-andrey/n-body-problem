import {CelestialMechanicsModulator} from "./CelestialMechanicsSimulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";

let canvas = <HTMLElement> document.getElementById("space");

let modulator = new CelestialMechanicsModulator();
let renderer = new CelestialMechanicsRenderer(canvas, modulator);

let integrationStep = 30 / 1000;
setInterval(() => {
    modulator.integrate(integrationStep);
}, integrationStep * 1000);


function tick () {
    renderer.render();
    requestAnimationFrame(tick);
}
tick();
