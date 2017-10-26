import {CelestialMechanicsSimulator} from "./CelestialMechanicsSimulator";
import {CelestialMechanicsRenderer} from "./CelestialMechanicsRenderer";
import {CelestialMechanicsController} from "./CelestialMechanicsController";

let canvas = <HTMLElement> document.getElementById("space");
let simulator = new CelestialMechanicsSimulator();
let renderer = new CelestialMechanicsRenderer(canvas, simulator);
let controller = new CelestialMechanicsController(simulator, renderer);
controller.start();
