import {Body} from "./models/Body";
import * as utilities from "./Utilities";

export class BodyControlsAccessor {
    public readonly boxElement: HTMLElement;
    private massInput: HTMLInputElement;
    private xVelocityInput: HTMLInputElement;
    private yVelocityInput: HTMLInputElement;
    private xPositionInput: HTMLInputElement;
    private yPositionInput: HTMLInputElement;

    constructor (public body: Body, name: string) {
        this.boxElement = utilities.createElementFromHtml(`<div class='body-controls-box'><span style="color: ${body.color}">${name}</span></div>`);

        this.massInput = <HTMLInputElement> utilities.createElementFromHtml(`<input type="text"/>`);
        this.xVelocityInput = <HTMLInputElement> utilities.createElementFromHtml(`<input type="text"/>`);
        this.yVelocityInput = <HTMLInputElement> utilities.createElementFromHtml(`<input type="text"/>`);
        this.xPositionInput = <HTMLInputElement> utilities.createElementFromHtml(`<input type="text"/>`);
        this.yPositionInput = <HTMLInputElement> utilities.createElementFromHtml(`<input type="text"/>`);

        let massLabel = utilities.createElementFromHtml('<label>Масса (кг):</label>');
        massLabel.appendChild(this.massInput);
        this.boxElement.appendChild(massLabel);

        let xVelocityLabel = utilities.createElementFromHtml('<label>Вектор скорости X (м/с):</label>');
        xVelocityLabel.appendChild(this.xVelocityInput);
        this.boxElement.appendChild(xVelocityLabel);

        let yVelocityLabel = utilities.createElementFromHtml('<label>Вектор скорости Y (м/с):</label>');
        yVelocityLabel.appendChild(this.yVelocityInput);
        this.boxElement.appendChild(yVelocityLabel);

        let xPositionLabel = utilities.createElementFromHtml('<label>Позиция X (м):</label>');
        xPositionLabel.appendChild(this.xPositionInput);
        this.boxElement.appendChild(xPositionLabel);

        let yPositionLabel = utilities.createElementFromHtml('<label>Позиция Y (м):</label>');
        yPositionLabel.appendChild(this.yPositionInput);
        this.boxElement.appendChild(yPositionLabel);
    }

    apply () {
        this.body.mass = Number.parseFloat(this.massInput.value);
        this.body.velocity.x = Number.parseFloat(this.xVelocityInput.value);
        this.body.velocity.y = Number.parseFloat(this.yVelocityInput.value);
        this.body.position.x = Number.parseFloat(this.xPositionInput.value);
        this.body.position.y = Number.parseFloat(this.yPositionInput.value);
    }

    synchronise () {
        this.massInput.value = this.body.mass.toExponential();
        this.xVelocityInput.value = this.body.velocity.x.toExponential();
        this.yVelocityInput.value = this.body.velocity.y.toExponential();
        this.xPositionInput.value = this.body.position.x.toExponential();
        this.yPositionInput.value = this.body.position.y.toExponential();
    }
}