import {CelestialMechanicsController} from "./CelestialMechanicsController";

let space = <HTMLElement> document.getElementById("space");
let controls = <HTMLElement> document.getElementById("controls");
let controller = new CelestialMechanicsController(space, controls);
controller.start();
