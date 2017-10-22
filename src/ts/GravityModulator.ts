import {Body} from "./Body";

const EARTH_MASS = 5.9726e24;

export class GravityModulator {
    private context: CanvasRenderingContext2D;
    private bodies: Body[] = [];
    private scale: number = 3e6;

    constructor (canvas: HTMLCanvasElement) {
        this.context = canvas.getContext("2d");
        this.bodies.push(new Body(9e8, 8.1e8, EARTH_MASS));
        this.bodies.push(new Body(4.5e8, 9e8, EARTH_MASS));
        this.bodies.push(new Body(7.5e8, 4.5e8, EARTH_MASS));
        this.render();
    }

    render () {
        this.context.fillStyle = "#900";
        this.bodies.forEach(body => {
            this.context.beginPath();
            let x = body.position.x / this.scale;
            let y = body.position.y / this.scale;
            this.context.arc(x, y, 3, 0, 2 * Math.PI);
            this.context.fill();
        });
    }
}
