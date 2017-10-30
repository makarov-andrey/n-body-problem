import {CelestialMechanicsSimulator} from "./CelestialMechanicsSimulator";
import {Body} from "./models/Body";
import {Position} from "./models/Position";

export class CelestialMechanicsRenderer {
    public scale: number = 3e6;
    public previousPositions: WeakMap<Body, Position> = new WeakMap;
    protected trajectoriesLayer: CanvasRenderingContext2D;
    protected bodiesLayer: CanvasRenderingContext2D;

    constructor (
        public space: HTMLElement,
        public modulator: CelestialMechanicsSimulator
    ) {
        this.createLayers();
        this.resetDrawnPositions();
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

    private resetDrawnPositions () {
        this.modulator.bodies.forEach(body => {
            let prevPosition = this.previousPositions.get(body);
            if (!prevPosition) {
                prevPosition = new Position();
                this.previousPositions.set(body, prevPosition);
            }
            prevPosition.x = body.position.x;
            prevPosition.y = body.position.y;
        })
    }

    private needRendering () {
        return this.modulator.bodies.some(body => {
            let prevPosition = this.previousPositions.get(body);
            return Math.round(prevPosition.x / this.scale) != Math.round(body.position.x / this.scale)
                || Math.round(prevPosition.y / this.scale) != Math.round(body.position.y / this.scale);
        });
    }

    render () {
        this.renderTrajectories();
        this.renderBodies();
    }

    renderEfficiently () {
        if (this.needRendering()) {
            this.render();
        }
    }

    private renderBodies () {
        this.bodiesLayer.clearRect(0, 0, this.bodiesLayer.canvas.width, this.bodiesLayer.canvas.height);
        this.modulator.bodies.forEach(body => {
            let x = Math.round(body.position.x / this.scale * 10) / 10;
            let y = Math.round(body.position.y / this.scale * 10) / 10;

            this.bodiesLayer.fillStyle = body.color;
            this.bodiesLayer.beginPath();
            this.bodiesLayer.arc(x, y, 3, 0, 2 * Math.PI);
            this.bodiesLayer.fill();
        });
    }

    private renderTrajectories () {
        this.modulator.bodies.forEach(body => {
            let prevPosition = this.previousPositions.get(body);
            if (!prevPosition) {
                prevPosition = new Position(body.position.x, body.position.y);
                this.previousPositions.set(body, prevPosition);
            }
            let oldX = Math.round(prevPosition.x / this.scale * 10) / 10;
            let oldY = Math.round(prevPosition.y / this.scale * 10) / 10;

            let newX = Math.round(body.position.x / this.scale * 10) / 10;
            let newY = Math.round(body.position.y / this.scale * 10) / 10;

            this.trajectoriesLayer.strokeStyle = body.color;
            this.trajectoriesLayer.beginPath();
            this.trajectoriesLayer.moveTo(oldX, oldY);
            this.trajectoriesLayer.lineTo(newX, newY);
            this.trajectoriesLayer.stroke();
        });
        this.resetDrawnPositions();
    }

    reset() {
        this.trajectoriesLayer.clearRect(0, 0, this.trajectoriesLayer.canvas.width, this.trajectoriesLayer.canvas.height);
        this.resetDrawnPositions();
        this.render();
    }
}
