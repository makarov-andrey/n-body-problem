import {CelestialMechanicsModulator} from "./CelestialMechanicsModulator";

export class CelestialMechanicsRenderer {
    public scale: number = 3e6;

    constructor (
        public context: CanvasRenderingContext2D,
        public modulator: CelestialMechanicsModulator
    ) {}

    render () {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.fillStyle = "#900";
        this.modulator.bodies.forEach(body => {
            this.context.beginPath();
            let x = body.position.x / this.scale;
            let y = body.position.y / this.scale;
            this.context.arc(x, y, 3, 0, 2 * Math.PI);
            this.context.fill();
        });
    }
}
