import {CelestialMechanicsModulator} from "./CelestialMechanicsModulator";
import {Body} from "./models/Body";
import {Position} from "./models/Position";

export class CelestialMechanicsRenderer {
    public scale: number = 3e6;
    public bodiesColors: Map<Body, string> = new Map;
    public prevPositions: Map<Body, Position> = new Map;
    protected trajectoriesLayer: CanvasRenderingContext2D;
    protected bodiesLayer: CanvasRenderingContext2D;

    constructor (
        public space: HTMLElement,
        public modulator: CelestialMechanicsModulator
    ) {
        this.createLayers();
        this.fillColors();
        this.fillPrevPositions();
    }

    private createLayers () {
        let  trajectoriesCanvas = document.createElement("canvas");
        trajectoriesCanvas.width = this.space.offsetWidth;
        trajectoriesCanvas.height = this.space.offsetHeight;
        this.space.appendChild(trajectoriesCanvas);
        this.trajectoriesLayer = trajectoriesCanvas.getContext("2d");

        let bodiesCanvas = document.createElement("canvas");
        bodiesCanvas.width = this.space.offsetWidth;
        bodiesCanvas.height = this.space.offsetHeight;
        this.space.appendChild(bodiesCanvas);
        this.bodiesLayer = bodiesCanvas.getContext("2d");
    }

    private fillColors () {
        let niceColors = [
            "#900",
            "#090",
            "#009",
            "#990",
            "#909",
            "#099",
            "#999",
        ];

        this.modulator.bodies.forEach(body => {
            this.bodiesColors.set(body, niceColors.shift());
        })
    }

    private fillPrevPositions () {
        this.modulator.bodies.forEach(body => {
            this.prevPositions.set(body, new Position(body.position.x, body.position.y));
        })
    }

    render () {
        this.renderTrajectories();
        this.renderBodies();
    }

    private renderBodies () {
        this.bodiesLayer.clearRect(0, 0, this.bodiesLayer.canvas.width, this.bodiesLayer.canvas.height);
        this.modulator.bodies.forEach(body => {
            let x = body.position.x / this.scale;
            let y = body.position.y / this.scale;

            this.bodiesLayer.fillStyle = this.bodiesColors.get(body);
            this.bodiesLayer.beginPath();
            this.bodiesLayer.arc(x, y, 3, 0, 2 * Math.PI);
            this.bodiesLayer.fill();
        });
    }

    private renderTrajectories () {
        this.modulator.bodies.forEach(body => {
            let oldX = this.prevPositions.get(body).x / this.scale;
            let oldY = this.prevPositions.get(body).y / this.scale;

            let newX = body.position.x / this.scale;
            let newY = body.position.y / this.scale;

            this.trajectoriesLayer.strokeStyle = this.bodiesColors.get(body);
            this.trajectoriesLayer.beginPath();
            this.trajectoriesLayer.moveTo(oldX, oldY);
            this.trajectoriesLayer.lineTo(newX, newY);
            this.trajectoriesLayer.stroke();
        });
        this.fillPrevPositions();
    }
}
