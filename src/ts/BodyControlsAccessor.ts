import {Body} from "./models/Body";

export class BodyControlsAccessor {
    public readonly boxElement: HTMLElement;
    private massInput: HTMLInputElement;
    private xVelocityInput: HTMLInputElement;
    private yVelocityInput: HTMLInputElement;
    private xPositionInput: HTMLInputElement;
    private yPositionInput: HTMLInputElement;

    constructor (public body: Body, name: string) {
        let createElementFromHtml = html => {
            let template = document.createElement('template');
            template.innerHTML = html;
            return <HTMLElement> template.content.firstChild;
        };

        this.boxElement = createElementFromHtml(`<div class='body-controls-box'><span style="color: ${body.color}">${name}</span></div>`);

        this.massInput = <HTMLInputElement> createElementFromHtml(`<input type="text"/>`);
        this.xVelocityInput = <HTMLInputElement> createElementFromHtml(`<input type="text"/>`);
        this.yVelocityInput = <HTMLInputElement> createElementFromHtml(`<input type="text"/>`);
        this.xPositionInput = <HTMLInputElement> createElementFromHtml(`<input type="text"/>`);
        this.yPositionInput = <HTMLInputElement> createElementFromHtml(`<input type="text"/>`);

        let massLabel = createElementFromHtml('<label>Масса (кг):</label>');
        massLabel.appendChild(this.massInput);
        this.boxElement.appendChild(massLabel);

        let xVelocityLabel = createElementFromHtml('<label>Вектор скорости X (м/с):</label>');
        xVelocityLabel.appendChild(this.xVelocityInput);
        this.boxElement.appendChild(xVelocityLabel);

        let yVelocityLabel = createElementFromHtml('<label>Вектор скорости Y (м/с):</label>');
        yVelocityLabel.appendChild(this.yVelocityInput);
        this.boxElement.appendChild(yVelocityLabel);

        let xPositionLabel = createElementFromHtml('<label>Позиция X (м):</label>');
        xPositionLabel.appendChild(this.xPositionInput);
        this.boxElement.appendChild(xPositionLabel);

        let yPositionLabel = createElementFromHtml('<label>Позиция Y (м):</label>');
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