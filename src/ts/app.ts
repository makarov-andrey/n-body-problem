import {CelestialMechanicsModulator} from "./CelestialMechanicsModulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";
import {VectorValue} from "./VectorValue";

let canvas = <HTMLCanvasElement> document.getElementById("space");

let modulator = new CelestialMechanicsModulator();
let renderer = new CelestialMechanicsRenderer(canvas.getContext("2d"), modulator);

requestAnimationFrame(() => {
    modulator.integrate(30 / 1000);
    renderer.render();
});
