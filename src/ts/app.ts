import {CelestialMechanicsModulator} from "./CelestialMechanicsModulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";

let canvas = <HTMLCanvasElement> document.getElementById("space");

let modulator = new CelestialMechanicsModulator();
let renderer = new CelestialMechanicsRenderer(canvas.getContext("2d"), modulator);

requestAnimationFrame(() => {
    modulator.integrate(30);
    renderer.render();
});